/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
export { Manager } from './manager';
export { Settings } from './settings';

/**
 * Declarations.
 */
import { ConstructorClass, ConstructorCallback, ClassDecorator, GenericDecorator } from './types';
import { Settings } from './settings';
import { Manager } from './manager';

// Global manager.
const global = new Manager();

/**
 * Type declaration for a dependency constructor type.
 */
export type Dependency<T extends Object = any> = ConstructorClass<T> | ConstructorCallback<T>;

/**
 * Decorates the specified class to be a dependency class.
 * @param settings Dependency settings.
 * @returns Returns the decorator method.
 */
export const Describe = (settings?: Settings): ClassDecorator => global.Describe(settings);

/**
 * Decorates a class type or class property to be injected by the specified dependencies.
 * @param dependency First dependency class type.
 * @param dependencies Remaining dependency class types.
 * @returns Returns the decorator method.
 * @throws Throws an error when multiple dependencies are injected in class properties.
 */
export const Inject = (dependency: Dependency, ...dependencies: Dependency[]): GenericDecorator =>
  global.Inject(dependency, ...dependencies);

/**
 * Constructs a new instance of the specified dependency.
 * @param dependency Dependency class type.
 * @param args Construction arguments.
 * @returns Returns a new instance of the specified dependency.
 */
export const construct = <T extends Object>(dependency: Dependency<T>, ...args: any[]): T =>
  global.construct(dependency, ...args);

/**
 * Resolve the current instance of the specified dependency.
 * @param dependency Dependency class type.
 * @param args Construction arguments.
 * @returns Returns the resolved dependency instance.
 * @throws Throws a type error when the dependency isn't valid.
 */
export const resolve = <T extends Object>(dependency: Dependency<T>, ...args: any[]): T =>
  global.resolve(dependency, ...args);
