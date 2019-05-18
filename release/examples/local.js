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
/**
 * Creates a local dependency manager.
 */
const Manager = new Injection.Manager();
/**
 * Example of dependency A.
 */
let DependencyA = class DependencyA extends Class.Null {
    /**
     * Example of dependency A.
     */
    constructor() {
        super(...arguments);
        this.counter = 0;
    }
    count() {
        return this.counter++;
    }
};
__decorate([
    Class.Private()
], DependencyA.prototype, "counter", void 0);
__decorate([
    Class.Public()
], DependencyA.prototype, "count", null);
DependencyA = __decorate([
    Manager.Describe(),
    Class.Describe()
], DependencyA);
/**
 * Example of dependency B.
 * This is a singleton dependency.
 */
let DependencyB = class DependencyB extends DependencyA {
};
DependencyB = __decorate([
    Manager.Describe({ singleton: true }),
    Class.Describe()
], DependencyB);
/**
 * Example of dependency C.
 * This is a named dependency.
 */
let DependencyC = class DependencyC extends DependencyA {
};
DependencyC = __decorate([
    Manager.Describe({ name: 'named' }),
    Class.Describe()
], DependencyC);
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
        console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'C:', dependencies.named.count());
    }
};
DependentA = __decorate([
    Manager.Inject(DependencyA, DependencyC),
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
        console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'B:', dependencies.DependencyB.count());
    }
};
DependentB = __decorate([
    Manager.Inject(DependencyA, DependencyB),
    Class.Describe()
], DependentB);
/**
 * Construct the instances solving all the dependencies.
 */
[
    Manager.construct(DependentA, 'Instance 1'),
    Manager.construct(DependentA, 'Instance 2'),
    Manager.construct(DependentB, 'Instance 3'),
    Manager.construct(DependentB, 'Instance 4'),
    Manager.construct(DependentB, 'Instance 5')
];
