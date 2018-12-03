/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
export { Manager } from './manager';
export { Settings } from './settings';
import { Settings } from './settings';
import { Constructor, ClassDecorator } from './types';
export declare type Dependency<T> = Constructor<T>;
/**
 * Decorates the specified class to be a global dependency class.
 * @param settings Dependency settings.
 * @returns Returns the decorator method.
 */
export declare const Describe: (settings?: Settings | undefined) => ClassDecorator;
/**
 * Decorates the specified class to be injected by the specified global dependencies.
 * @param list List of dependencies.
 * @returns Returns the decorator method.
 */
export declare const Inject: (...list: Constructor<any>[]) => ClassDecorator;
/**
 * Resolves the current instance of the specified class type.
 * @param type Class type.
 * @throws Throws a type error when the class type does not exists in the dependencies.
 * @returns Returns the resolved instance.
 */
export declare const resolve: <T extends Object>(type: Constructor<T>) => T;
/**
 * Constructs a new instance of the specified class type.
 * @param type Class type.
 * @param parameters Initial parameters.
 * @returns Returns a new instance of the specified class type.
 */
export declare const construct: <T extends Object>(type: Constructor<T>, ...parameters: any[]) => T;
