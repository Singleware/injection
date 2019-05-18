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
     * @param parameters List of parameters.
     */
    constructor(...parameters) {
        super();
        console.log('P:', parameters, 'A:', this.dependencyA.count(), 'C:', this.dependencyC.count());
    }
};
__decorate([
    Injection.Inject(Dependencies.A),
    Class.Private()
], DependentA.prototype, "dependencyA", void 0);
__decorate([
    Injection.Inject(Dependencies.C),
    Class.Private()
], DependentA.prototype, "dependencyC", void 0);
DependentA = __decorate([
    Class.Describe()
], DependentA);
/**
 * Example of dependent B.
 */
let DependentB = class DependentB extends Class.Null {
    /**
     * Default constructor.
     * @param parameters List of parameters.
     */
    constructor(...parameters) {
        super();
        console.log('P:', parameters, 'A:', this.dependencyA.count(), 'B:', this.dependencyB.count());
    }
    count() {
        console.log('A:', this.dependencyA.count(), 'B:', this.dependencyB.count());
    }
};
__decorate([
    Injection.Inject(Dependencies.A),
    Class.Private()
], DependentB.prototype, "dependencyA", void 0);
__decorate([
    Injection.Inject(Dependencies.B),
    Class.Private()
], DependentB.prototype, "dependencyB", void 0);
__decorate([
    Class.Public()
], DependentB.prototype, "count", null);
DependentB = __decorate([
    Class.Describe()
], DependentB);
/**
 * Construct the instances solving all the dependencies.
 */
[new DependentA('Instance 1'), new DependentA('Instance 2'), new DependentB('Instance 3'), new DependentB('Instance 4'), new DependentB('Instance 5')];
