"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to implement the dependency injection using only
 * the local injection manager.
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
let DependencyA = class DependencyA {
    /**
     * Example of dependency A.
     */
    constructor() {
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
    Class.Describe(),
    Manager.Describe()
], DependencyA);
/**
 * Example of dependency B.
 * This is a singleton dependency.
 */
let DependencyB = class DependencyB extends DependencyA {
};
DependencyB = __decorate([
    Class.Describe(),
    Manager.Describe({ singleton: true })
], DependencyB);
/**
 * Example of dependency C.
 * This is a named dependency.
 */
let DependencyC = class DependencyC extends DependencyA {
};
DependencyC = __decorate([
    Class.Describe(),
    Manager.Describe({ name: 'named' })
], DependencyC);
/**
 * Example of dependent A.
 */
let DependentA = class DependentA {
    /**
     * Default constructor.
     * @param dependencies Map of dependencies.
     * @param parameters List of parameters.
     */
    constructor(dependencies, parameters) {
        console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'C:', dependencies.named.count());
    }
};
DependentA = __decorate([
    Class.Describe(),
    Manager.Inject(DependencyA, DependencyC)
], DependentA);
/**
 * Example of dependent B.
 */
let DependentB = class DependentB {
    /**
     * Default constructor.
     * @param dependencies Map of dependencies.
     * @param parameters List of parameters.
     */
    constructor(dependencies, parameters) {
        console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'B:', dependencies.DependencyB.count());
    }
};
DependentB = __decorate([
    Class.Describe(),
    Manager.Inject(DependencyA, DependencyB)
], DependentB);
/**
 * Construct the instances solving all the dependencies.
 */
const instances = [
    Manager.construct(DependentA, 'Instance 1'),
    Manager.construct(DependentA, 'Instance 2'),
    Manager.construct(DependentB, 'Instance 3'),
    Manager.construct(DependentB, 'Instance 4')
];
