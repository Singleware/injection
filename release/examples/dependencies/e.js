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
const Dependencies = require("./d");
/**
 * Example of dependency E.
 * This is a named dependency.
 */
let E = class E extends Class.Null {
    /**
     * Example of dependency E.
     * This is a named dependency.
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
        return this.module.helper(this.counter++);
    }
    /**
     * Helper function.
     * @param value Input value.
     * @returns Return the input value multiplied by 20.
     */
    helper(value) {
        return value * 20;
    }
};
__decorate([
    Class.Private()
], E.prototype, "counter", void 0);
__decorate([
    Injection.Inject(() => Dependencies.D),
    Class.Private()
], E.prototype, "module", void 0);
__decorate([
    Class.Public()
], E.prototype, "count", null);
__decorate([
    Class.Public()
], E.prototype, "helper", null);
E = __decorate([
    Injection.Describe({ singleton: true, name: 'named' }),
    Class.Describe()
], E);
exports.E = E;
