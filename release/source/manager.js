"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
/**
 * Dependency manager class.
 */
let Manager = class Manager extends Class.Null {
    /**
     * Dependency manager class.
     */
    constructor() {
        super(...arguments);
        /**
         * Map of dependency settings.
         */
        this.settingsMap = new WeakMap();
        /**
         * Map of singleton instances.
         */
        this.singletonsMap = new WeakMap();
        /**
         * Map of injected properties.
         */
        this.injectionsMap = new WeakMap();
    }
    /**
     * Determines whether or not the specified dependency is a class type.
     * @param dependency Dependency class type.
     * @returns Returns true when the specified dependency is a class type, false otherwise.
     */
    isClass(dependency) {
        return `${dependency.prototype ? dependency.prototype.constructor : dependency}`.startsWith('class');
    }
    /**
     * Wraps the constructor of the specified class type to be injected by the given dependencies.
     * @param type Class type.
     * @param dependencies List of dependency class types.
     * @returns Returns the wrapped class type.
     */
    wrapConstructor(type, dependencies) {
        return new Proxy(type, {
            construct: (target, parameters, other) => {
                const list = {};
                for (const type of dependencies) {
                    const instance = this.resolve(type);
                    const constructor = Reflect.getPrototypeOf(instance).constructor;
                    const settings = this.settingsMap.get(constructor);
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
    createProperty(property, dependency) {
        const resolver = this.resolve.bind(this, dependency);
        const injectionsMap = this.injectionsMap;
        let currentMap;
        return {
            enumerable: false,
            get: function () {
                const context = Class.resolve(this);
                if (!(currentMap = injectionsMap.get(context))) {
                    injectionsMap.set(context, (currentMap = {}));
                }
                if (!(property in currentMap)) {
                    return (currentMap[property] = resolver());
                }
                return currentMap[property];
            },
            set: function () {
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
    wrapProperty(property, dependency, descriptor) {
        if (descriptor.value instanceof Function) {
            throw new Error(`Only properties are allowed for dependency injection.`);
        }
        else {
            if (!(descriptor.get instanceof Function) || !(descriptor.set instanceof Function)) {
                return this.createProperty(property, dependency);
            }
            else {
                const resolver = this.resolve.bind(this, dependency);
                const realGetter = descriptor.get;
                const realSetter = descriptor.set;
                descriptor.get = function () {
                    let instance = realGetter.call(this);
                    if (!instance) {
                        instance = resolver();
                        realSetter.call(this, instance);
                    }
                    return instance;
                };
                descriptor.set = function () {
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
    Describe(settings) {
        return (type) => {
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
    Inject(dependency, ...dependencies) {
        return (scope, property, descriptor) => {
            if (!property) {
                return this.wrapConstructor(scope, [dependency, ...dependencies]);
            }
            else {
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
    construct(dependency, ...args) {
        return new (this.isClass(dependency) ? dependency : dependency())(...args);
    }
    /**
     * Resolve the current instance of the specified dependency.
     * @param dependency Dependency class type.
     * @param args Construction arguments.
     * @returns Returns the resolved dependency instance.
     * @throws Throws a type error when the dependency isn't valid.
     */
    resolve(dependency, ...args) {
        const type = this.isClass(dependency) ? dependency : dependency();
        const constructor = type.prototype.constructor;
        const settings = this.settingsMap.get(constructor);
        if (!settings) {
            throw new TypeError(`Dependency '${constructor.name}' doesn't found.`);
        }
        else {
            if (settings.singleton) {
                let instance = this.singletonsMap.get(constructor);
                if (!instance) {
                    instance = new type(...args);
                    this.singletonsMap.set(constructor, instance);
                }
                return instance;
            }
            return new type(...args);
        }
    }
};
__decorate([
    Class.Private()
], Manager.prototype, "settingsMap", void 0);
__decorate([
    Class.Private()
], Manager.prototype, "singletonsMap", void 0);
__decorate([
    Class.Private()
], Manager.prototype, "injectionsMap", void 0);
__decorate([
    Class.Private()
], Manager.prototype, "isClass", null);
__decorate([
    Class.Private()
], Manager.prototype, "wrapConstructor", null);
__decorate([
    Class.Private()
], Manager.prototype, "createProperty", null);
__decorate([
    Class.Private()
], Manager.prototype, "wrapProperty", null);
__decorate([
    Class.Public()
], Manager.prototype, "Describe", null);
__decorate([
    Class.Public()
], Manager.prototype, "Inject", null);
__decorate([
    Class.Public()
], Manager.prototype, "construct", null);
__decorate([
    Class.Public()
], Manager.prototype, "resolve", null);
Manager = __decorate([
    Class.Describe()
], Manager);
exports.Manager = Manager;
