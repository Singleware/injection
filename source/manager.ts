/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Constructor, ClassDecorator, GenericDecorator } from './types';
import { Settings } from './settings';

/**
 * Dependency manager class.
 */
@Class.Describe()
export class Manager extends Class.Null {
  /**
   * Map of injected properties.
   */
  @Class.Private()
  private injectionsMap = new WeakMap<Object, any>();

  /**
   * Map of singleton instances.
   */
  @Class.Private()
  private singletonsMap = new WeakMap<Constructor, Object>();

  /**
   * Map of dependency settings.
   */
  @Class.Private()
  private settingsMap = new WeakMap<Constructor, Settings>();

  /**
   * Wraps the specified dependency list in the given class type.
   * @param type Class type.
   * @param dependencies Dependency class list.
   * @returns Returns the wrapped class type.
   */
  @Class.Private()
  private wrapClass<T extends Object>(type: Constructor<T>, dependencies: Constructor[]): Constructor<T> {
    return new Proxy(type, {
      construct: (target: Constructor<T>, parameters: IArguments, other: any): T => {
        const list = <any>{};
        for (const type of dependencies) {
          const settings = <Settings>this.settingsMap.get(type.prototype.constructor);
          list[settings.name || type.name] = this.resolve(type);
        }
        return Reflect.construct(target, [list, parameters], other);
      }
    });
  }

  /**
   * Creates a new property for the specified dependency.
   * @param property Property name.
   * @param dependency Dependency class.
   * @returns Returns the generated property descriptor.
   */
  @Class.Private()
  private createProperty(property: PropertyKey, dependency: Constructor): PropertyDescriptor {
    const resolver = this.resolve.bind(this, dependency);
    const injections = this.injectionsMap;
    let map;
    return {
      enumerable: false,
      get: function(this: Object): any {
        const context = Class.resolve(this);
        if (!(map = injections.get(context))) {
          injections.set(context, (map = {}));
        }
        return property in map ? map[property] : (map[property] = resolver());
      },
      set: function(): void {
        throw new Error(`Injected dependencies are read-only.`);
      }
    };
  }

  /**
   * Wraps the specified dependency into the given property descriptor.
   * @param property Property name.
   * @param dependency Dependency class.
   * @param descriptor Property descriptor.
   * @returns Returns the specified property descriptor or a new generated property descriptor.
   * @throws Throws an error when the property descriptor is a method.
   */
  @Class.Private()
  private wrapProperty(property: PropertyKey, dependency: Constructor, descriptor: PropertyDescriptor): PropertyDescriptor {
    if (descriptor.value instanceof Function) {
      throw new Error(`Only properties are allowed for dependency injection.`);
    } else {
      if (!(descriptor.get instanceof Function) || !(descriptor.set instanceof Function)) {
        return this.createProperty(property, dependency);
      } else {
        const resolver = this.resolve.bind(this, dependency);
        const getter = descriptor.get;
        const setter = descriptor.set;
        descriptor.get = function(this: Object): any {
          let instance = getter.call(this);
          if (!instance) {
            setter.call(this, (instance = resolver()));
          }
          return instance;
        };
        descriptor.set = function(): void {
          throw new Error(`Injected dependencies are read-only.`);
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
    return <T extends Object>(type: Constructor<T>): void => {
      if (this.settingsMap.has(type.prototype.constructor)) {
        throw new TypeError(`Dependency '${type.name}' is already described.`);
      }
      this.settingsMap.set(type.prototype.constructor, settings || {});
    };
  }

  /**
   * Decorates a class type or class property to be injected by the specified dependencies.
   * @param dependency First dependency.
   * @param dependencies Remaining dependencies.
   * @returns Returns the decorator method.
   * @throws Throws an error when multiple dependencies are specified in a class property injection.
   */
  @Class.Public()
  public Inject(dependency: Constructor, ...dependencies: Constructor[]): GenericDecorator {
    return (scope: Object, property?: PropertyKey, descriptor?: PropertyDescriptor): any => {
      if (!property) {
        return this.wrapClass(<Constructor>scope, [dependency, ...dependencies]);
      } else {
        if (dependencies.length > 0) {
          throw new Error(`Multiple dependency injection in a class property isn't allowed.`);
        }
        return this.wrapProperty(property, dependency, descriptor || {});
      }
    };
  }

  /**
   * Resolves the current instance from the specified class type.
   * @param type Class type.
   * @throws Throws a type error when the class type isn't a described dependency.
   * @returns Returns the resolved instance.
   */
  @Class.Public()
  public resolve<T extends Object>(type: Constructor<T>): T {
    const constructor = type.prototype.constructor;
    const settings = <Settings>this.settingsMap.get(constructor);
    if (!settings) {
      throw new TypeError(`Dependency '${type ? type.name : void 0}' doesn't found.`);
    } else {
      if (!settings.singleton) {
        return this.construct(type);
      } else {
        let instance = <T>this.singletonsMap.get(constructor);
        if (!instance) {
          this.singletonsMap.set(constructor, (instance = this.construct(type)));
        }
        return instance;
      }
    }
  }

  /**
   * Constructs a new instance for the specified class type.
   * @param type Class type.
   * @param parameters Initial parameters.
   * @returns Returns a new instance of the specified class type.
   */
  @Class.Public()
  public construct<T extends Object>(type: Constructor<T>, ...parameters: any[]): T {
    return new type(...parameters);
  }
}
