"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
var manager_1 = require("./manager");
exports.Manager = manager_1.Manager;
const manager_2 = require("./manager");
// Global manager.
const global = new manager_2.Manager();
/**
 * Decorates the specified class to be a dependency class.
 * @param settings Dependency settings.
 * @returns Returns the decorator method.
 */
exports.Describe = (settings) => global.Describe(settings);
/**
 * Decorates a class type or class property to be injected by the specified dependencies.
 * @param dependency First dependency class type.
 * @param dependencies Remaining dependency class types.
 * @returns Returns the decorator method.
 * @throws Throws an error when multiple dependencies are injected in class properties.
 */
exports.Inject = (dependency, ...dependencies) => global.Inject(dependency, ...dependencies);
/**
 * Constructs a new instance of the specified dependency.
 * @param dependency Dependency class type.
 * @param args Construction arguments.
 * @returns Returns a new instance of the specified dependency.
 */
exports.construct = (dependency, ...args) => global.construct(dependency, ...args);
/**
 * Resolve the current instance of the specified dependency.
 * @param dependency Dependency class type.
 * @param args Construction arguments.
 * @returns Returns the resolved dependency instance.
 * @throws Throws a type error when the dependency isn't valid.
 */
exports.resolve = (dependency, ...args) => global.resolve(dependency, ...args);
