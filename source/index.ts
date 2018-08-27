/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Manager } from './manager';
export { Manager } from './manager';

import { Settings } from './settings';
export { Settings } from './settings';

import { Constructor, ClassDecorator } from './types';
export type Dependency<T> = Constructor<T>;

// Global manager
const global = new Manager();

/**
 * Decorates the specified class to be a dependency class.
 * @param settings Dependency settings.
 * @returns Returns the decorator method.
 */
export const Describe = (settings?: Settings): ClassDecorator => global.Describe(settings);

/**
 * Decorates the specified class to be injected by the specified dependencies.
 * @param list List of dependencies.
 * @returns Returns the decorator method.
 */
export const Inject = (...list: Dependency<any>[]): ClassDecorator => global.Inject(...list);

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
