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
export declare class Manager extends Class.Null {
    /**
     * Map of dependency settings.
     */
    private settingsMap;
    /**
     * Map of singleton instances.
     */
    private singletonsMap;
    /**
     * Map of injected properties.
     */
    private injectionsMap;
    /**
     * Determines whether or not the specified dependency is a class type.
     * @param dependency Dependency class type.
     * @returns Returns true when the specified dependency is a class type, false otherwise.
     */
    private isClass;
    /**
     * Wraps the constructor of the specified class type to be injected by the given dependencies.
     * @param type Class type.
     * @param dependencies List of dependency class types.
     * @returns Returns the wrapped class type.
     */
    private wrapConstructor;
    /**
     * Creates a new property that will use the specified dependency.
     * @param property Property name.
     * @param dependency Dependency class type.
     * @returns Returns the generated property descriptor.
     */
    private createProperty;
    /**
     * Wraps the specified dependency into the given property descriptor.
     * @param property Property name.
     * @param dependency Dependency class type.
     * @param descriptor Property descriptor.
     * @returns Returns the specified property descriptor or a new property descriptor.
     * @throws Throws an error when the property descriptor is a method.
     */
    private wrapProperty;
    /**
     * Decorates the specified class to be a dependency class.
     * @param settings Dependency settings.
     * @returns Returns the decorator method.
     */
    Describe(settings?: Settings): ClassDecorator;
    /**
     * Decorates a class type or class property to be injected by the specified dependencies.
     * @param dependency First dependency class type.
     * @param dependencies Remaining dependency class types.
     * @returns Returns the decorator method.
     * @throws Throws an error when multiple dependencies are injected in class properties.
     */
    Inject(dependency: ConstructorClass | ConstructorCallback, ...dependencies: (ConstructorClass | ConstructorCallback)[]): GenericDecorator;
    /**
     * Constructs a new instance of the specified dependency.
     * @param dependency Dependency class type.
     * @param args Construction arguments.
     * @returns Returns a new instance of the specified dependency.
     */
    construct<T extends Object>(dependency: ConstructorClass<T> | ConstructorCallback<T>, ...args: any[]): T;
    /**
     * Resolve the current instance of the specified dependency.
     * @param dependency Dependency class type.
     * @param args Construction arguments.
     * @returns Returns the resolved dependency instance.
     * @throws Throws a type error when the dependency isn't valid.
     */
    resolve<T extends Object>(dependency: ConstructorClass<T> | ConstructorCallback<T>, ...args: any[]): T;
}
