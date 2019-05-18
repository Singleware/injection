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
export declare type Dependency<T = any> = Constructor<T>;
/**
 * Decorates the specified class to be a global dependency class.
 * @param settings Dependency settings.
 * @returns Returns the decorator method.
 */
export declare const Describe: (settings?: Settings | undefined) => ClassDecorator;
/**
 * Decorates a class type or class property to be injected by the specified dependencies.
 * @param dependency First dependency.
 * @param dependencies Remaining dependencies.
 * @returns Returns the decorator method.
 * @throws Throws an error when multiple dependencies are specified in a class property injection.
 */
export declare const Inject: (dependency: Constructor<any>, ...dependencies: Constructor<any>[]) => GenericDecorator;
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
