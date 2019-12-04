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
const Injection = require("../source");
const Dependencies = require("./dependencies");
/**
 * Example of dependent with circular dependencies.
 */
let Dependent = class Dependent extends Class.Null {
    /**
     * Default constructor.
     * @param parameters List of parameters.
     */
    constructor(...parameters) {
        super();
        console.log('P:', parameters, 'D:', this.dependencyD.count(), 'E:', this.dependencyE.count());
    }
};
__decorate([
    Injection.Inject(Dependencies.D),
    Class.Private()
], Dependent.prototype, "dependencyD", void 0);
__decorate([
    Injection.Inject(Dependencies.E),
    Class.Private()
], Dependent.prototype, "dependencyE", void 0);
Dependent = __decorate([
    Class.Describe()
], Dependent);
/**
 * Construct the instances solving all the dependencies.
 */
[
    new Dependent('Instance 1'),
    new Dependent('Instance 2'),
    new Dependent('Instance 3'),
    new Dependent('Instance 4'),
    new Dependent('Instance 5')
];
