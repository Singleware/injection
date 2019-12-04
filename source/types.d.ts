/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Type declaration for class constructors.
 */
export type ConstructorClass<T extends Object = any> = new (...args: any[]) => T;

/**
 * Type declaration for class constructor callbacks.
 */
export type ConstructorCallback<T extends Object = any> = () => ConstructorClass<T>;

/**
 * Type declaration for class decorators.
 */
export type ClassDecorator = <T extends Object>(type: ConstructorClass<T>) => any;

/**
 * Type declaration for decorators of classes and members.
 */
export type GenericDecorator = <T>(
  scope: Object | Function,
  property?: PropertyKey,
  descriptor?: TypedPropertyDescriptor<T>
) => any;
