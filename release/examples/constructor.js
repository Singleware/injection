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
 * Example of dependent A.
 */
let DependentA = class DependentA extends Class.Null {
    /**
     * Default constructor.
     * @param dependencies Map of dependencies.
     * @param parameters List of parameters.
     */
    constructor(dependencies, parameters) {
        super();
        console.log('P:', parameters, 'A:', dependencies.A.count(), 'C:', dependencies.named.count());
    }
};
DependentA = __decorate([
    Injection.Inject(Dependencies.A, Dependencies.C),
    Class.Describe()
], DependentA);
/**
 * Example of dependent B.
 */
let DependentB = class DependentB extends Class.Null {
    /**
     * Default constructor.
     * @param dependencies Map of dependencies.
     * @param parameters List of parameters.
     */
    constructor(dependencies, parameters) {
        super();
        console.log('P:', parameters, 'A:', dependencies.A.count(), 'B:', dependencies.B.count());
    }
};
DependentB = __decorate([
    Injection.Inject(Dependencies.A, Dependencies.B),
    Class.Describe()
], DependentB);
/**
 * Construct the instances solving all the dependencies.
 */
[
    Injection.construct(DependentA, 'Instance 1'),
    Injection.construct(DependentA, 'Instance 2'),
    Injection.construct(DependentB, 'Instance 3'),
    Injection.construct(DependentB, 'Instance 4'),
    Injection.construct(DependentB, 'Instance 5')
];
