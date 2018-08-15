"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
/**
 * Dependency manager class.
 */
let Manager = class Manager {
    /**
     * Dependency manager class.
     */
    constructor() {
        /**
         * Map of singleton instances.
         */
        this.instances = new WeakMap();
        /**
         * Map of dependencies.
         */
        this.dependencies = new WeakMap();
    }
    /**
     * Decorates the specified class to be a dependency class.
     * @param settings Dependency settings.
     * @returns Returns the decorator method.
     */
    Describe(settings) {
        return Class.bindCallback((type) => {
            if (this.dependencies.has(type.prototype)) {
                throw new TypeError(`Dependency type ${type.name} is already described.`);
            }
            this.dependencies.set(type.prototype, settings || {});
        });
    }
    /**
     * Decorates the specified class to be injected by the specified dependencies.
     * @param list List of dependencies.
     * @returns Returns the decorator method.
     */
    Inject(...list) {
        return Class.bindCallback((type) => {
            const repository = this.dependencies;
            return new Proxy(type, {
                construct: (type, parameters, target) => {
                    const dependencies = {};
                    for (const type of list) {
                        const settings = repository.get(type.prototype);
                        dependencies[settings.name || type.name] = this.resolve(type);
                    }
                    return Reflect.construct(type, [dependencies, parameters], target);
                }
            });
        });
    }
    /**
     * Resolves the current instance of the specified class type.
     * @param type Class type.
     * @throws Throws a type error when the class type does not exists in the dependencies.
     * @returns Returns the resolved instance.
     */
    resolve(type) {
        const settings = this.dependencies.get(type.prototype);
        if (!settings) {
            throw new TypeError(`Dependency type ${type ? type.name : void 0} does not exists.`);
        }
        if (!settings.singleton) {
            return this.construct(type);
        }
        let instance = this.instances.get(type);
        if (!instance) {
            this.instances.set(type, (instance = this.construct(type)));
        }
        return instance;
    }
    /**
     * Constructs a new instance of the specified class type.
     * @param type Class type.
     * @param parameters Initial parameters.
     * @returns Returns a new instance of the specified class type.
     */
    construct(type, ...parameters) {
        return new type(...parameters);
    }
};
__decorate([
    Class.Private()
], Manager.prototype, "instances", void 0);
__decorate([
    Class.Private()
], Manager.prototype, "dependencies", void 0);
__decorate([
    Class.Public()
], Manager.prototype, "Describe", null);
__decorate([
    Class.Public()
], Manager.prototype, "Inject", null);
__decorate([
    Class.Public()
], Manager.prototype, "resolve", null);
__decorate([
    Class.Public()
], Manager.prototype, "construct", null);
Manager = __decorate([
    Class.Describe()
], Manager);
exports.Manager = Manager;
