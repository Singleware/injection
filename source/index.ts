/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
export { Manager } from './manager';
export { Settings } from './settings';

/**
 * Declarations.
 */
import { Constructor, ClassDecorator, GenericDecorator } from './types';
import { Settings } from './settings';
import { Manager } from './manager';

export type Dependency<T = any> = Constructor<T>;

// Global manager.
const global = new Manager();

/**
 * Decorates the specified class to be a global dependency class.
 * @param settings Dependency settings.
 * @returns Returns the decorator method.
 */
export const Describe = (settings?: Settings): ClassDecorator => global.Describe(settings);

/**
 * Decorates a class type or class property to be injected by the specified dependencies.
 * @param dependency First dependency.
 * @param dependencies Remaining dependencies.
 * @returns Returns the decorator method.
 * @throws Throws an error when multiple dependencies are specified in a class property injection.
 */
export const Inject = (dependency: Dependency, ...dependencies: Dependency[]): GenericDecorator => global.Inject(dependency, ...dependencies);

/**
 * Resolves the current instance of the specified class type.
 * @param type Class type.
 * @throws Throws a type error when the class type does not exists in the dependencies.
 * @returns Returns the resolved instance.
 */
export const resolve = <T extends Object>(type: Dependency<T>): T => global.resolve(type);

/**
 * Constructs a new instance of the specified class type.
 * @param type Class type.
 * @param parameters Initial parameters.
 * @returns Returns a new instance of the specified class type.
 */
export const construct = <T extends Object>(type: Dependency<T>, ...parameters: any[]): T => global.construct(type, ...parameters);
