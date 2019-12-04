/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { ConstructorClass, ConstructorCallback, ClassDecorator, GenericDecorator } from './types';
import { Settings } from './settings';

/**
 * Dependency manager class.
 */
@Class.Describe()
export class Manager extends Class.Null {
  /**
   * Map of dependency settings.
   */
  @Class.Private()
  private settingsMap = new WeakMap<ConstructorClass, Settings>();

  /**
   * Map of singleton instances.
   */
  @Class.Private()
  private singletonsMap = new WeakMap<ConstructorClass, Object>();

  /**
   * Map of injected properties.
   */
  @Class.Private()
  private injectionsMap = new WeakMap<Object, any>();

  /**
   * Determines whether or not the specified dependency is a class type.
   * @param dependency Dependency class type.
   * @returns Returns true when the specified dependency is a class type, false otherwise.
   */
  @Class.Private()
  private isClass<T extends Object>(
    dependency: ConstructorClass<T> | ConstructorCallback<T>
  ): dependency is ConstructorClass<T> {
    return `${dependency.prototype ? dependency.prototype.constructor : dependency}`.startsWith('class');
  }

  /**
   * Wraps the constructor of the specified class type to be injected by the given dependencies.
   * @param type Class type.
   * @param dependencies List of dependency class types.
   * @returns Returns the wrapped class type.
   */
  @Class.Private()
  private wrapConstructor<T extends Object>(
    type: ConstructorClass<T>,
    dependencies: (ConstructorClass | ConstructorCallback)[]
  ): ConstructorClass<T> {
    return new Proxy(type, {
      construct: (target: ConstructorClass<T>, parameters: IArguments, other: any): T => {
        const list = <any>{};
        for (const type of dependencies) {
          const instance = this.resolve(type);
          const constructor = <ConstructorClass>Reflect.getPrototypeOf(instance).constructor;
          const settings = <Settings>this.settingsMap.get(constructor);
          list[settings.name || constructor.name] = instance;
        }
        return Reflect.construct(target, [list, parameters], other);
      }
    });
  }

  /**
   * Creates a new property that will use the specified dependency.
   * @param property Property name.
   * @param dependency Dependency class type.
   * @returns Returns the generated property descriptor.
   */
  @Class.Private()
  private createProperty<T extends Object>(
    property: PropertyKey,
    dependency: ConstructorClass<T> | ConstructorCallback<T>
  ): PropertyDescriptor {
    const resolver = this.resolve.bind(this, dependency);
    const injectionsMap = this.injectionsMap;
    let currentMap;
    return {
      enumerable: false,
      get: function(this: Object): any {
        const context = Class.resolve(this);
        if (!(currentMap = injectionsMap.get(context))) {
          injectionsMap.set(context, (currentMap = {}));
        }
        if (!(property in currentMap)) {
          return (currentMap[property] = resolver());
        }
        return currentMap[property];
      },
      set: function(): void {
        throw new Error(`Injected dependencies make properties read-only.`);
      }
    };
  }

  /**
   * Wraps the specified dependency into the given property descriptor.
   * @param property Property name.
   * @param dependency Dependency class type.
   * @param descriptor Property descriptor.
   * @returns Returns the specified property descriptor or a new property descriptor.
   * @throws Throws an error when the property descriptor is a method.
   */
  @Class.Private()
  private wrapProperty<T extends Object>(
    property: PropertyKey,
    dependency: ConstructorClass<T> | ConstructorCallback<T>,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    if (descriptor.value instanceof Function) {
      throw new Error(`Only properties are allowed for dependency injection.`);
    } else {
      if (!(descriptor.get instanceof Function) || !(descriptor.set instanceof Function)) {
        return this.createProperty(property, dependency);
      } else {
        const resolver = this.resolve.bind(this, dependency);
        const realGetter = descriptor.get;
        const realSetter = descriptor.set;
        descriptor.get = function(this: Object): any {
          let instance = realGetter.call(this);
          if (!instance) {
            instance = resolver();
            realSetter.call(this, instance);
          }
          return instance;
        };
        descriptor.set = function(): void {
          throw new Error(`Injected dependencies make properties read-only.`);
        };
        return descriptor;
      }
    }
  }

  /**
   * Decorates the specified class to be a dependency class.
   * @param settings Dependency settings.
   * @returns Returns the decorator method.
   */
  @Class.Public()
  public Describe(settings?: Settings): ClassDecorator {
    return <T extends Object>(type: ConstructorClass<T>): void => {
      const constructor = type.prototype.constructor;
      if (this.settingsMap.has(constructor)) {
        throw new TypeError(`Dependency '${constructor.name}' is already described.`);
      }
      this.settingsMap.set(constructor, settings || {});
    };
  }

  /**
   * Decorates a class type or class property to be injected by the specified dependencies.
   * @param dependency First dependency class type.
   * @param dependencies Remaining dependency class types.
   * @returns Returns the decorator method.
   * @throws Throws an error when multiple dependencies are injected in class properties.
   */
  @Class.Public()
  public Inject(
    dependency: ConstructorClass | ConstructorCallback,
    ...dependencies: (ConstructorClass | ConstructorCallback)[]
  ): GenericDecorator {
    return (scope: Object, property?: PropertyKey, descriptor?: PropertyDescriptor): any => {
      if (!property) {
        return this.wrapConstructor(<ConstructorClass>scope, [dependency, ...dependencies]);
      } else {
        if (dependencies.length > 0) {
          throw new Error(`Multiple dependency injection in a class property isn't allowed.`);
        }
        return this.wrapProperty(property, dependency, descriptor || {});
      }
    };
  }

  /**
   * Constructs a new instance of the specified dependency.
   * @param dependency Dependency class type.
   * @param args Construction arguments.
   * @returns Returns a new instance of the specified dependency.
   */
  @Class.Public()
  public construct<T extends Object>(dependency: ConstructorClass<T> | ConstructorCallback<T>, ...args: any[]): T {
    return new (this.isClass(dependency) ? dependency : dependency())(...args);
  }

  /**
   * Resolve the current instance of the specified dependency.
   * @param dependency Dependency class type.
   * @param args Construction arguments.
   * @returns Returns the resolved dependency instance.
   * @throws Throws a type error when the dependency isn't valid.
   */
  @Class.Public()
  public resolve<T extends Object>(dependency: ConstructorClass<T> | ConstructorCallback<T>, ...args: any[]): T {
    const type = this.isClass(dependency) ? dependency : dependency();
    const constructor = type.prototype.constructor;
    const settings = this.settingsMap.get(constructor);
    if (!settings) {
      throw new TypeError(`Dependency '${constructor.name}' doesn't found.`);
    } else {
      if (settings.singleton) {
        let instance = <T>this.singletonsMap.get(constructor);
        if (!instance) {
          instance = new type(...args);
          this.singletonsMap.set(constructor, instance);
        }
        return instance;
      }
      return new type(...args);
    }
  }
}
