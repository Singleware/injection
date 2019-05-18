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
const Injection = require("../../source");
/**
 * Example of dependency A.
 */
let A = class A extends Class.Null {
    /**
     * Example of dependency A.
     */
    constructor() {
        super(...arguments);
        /**
         * Dependency counter.
         */
        this.counter = 0;
    }
    /**
     * Increase the dependency counter.
     * @returns Returns the current counter value.
     */
    count() {
        return this.counter++;
    }
};
__decorate([
    Class.Private()
], A.prototype, "counter", void 0);
__decorate([
    Class.Public()
], A.prototype, "count", null);
A = __decorate([
    Injection.Describe(),
    Class.Describe()
], A);
exports.A = A;
