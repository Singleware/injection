/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../source';

import * as Dependencies from './dependencies';

/**
 * Example of dependent A.
 */
@Injection.Inject(Dependencies.A, Dependencies.C)
@Class.Describe()
class DependentA extends Class.Null {
  /**
   * Default constructor.
   * @param dependencies Map of dependencies.
   * @param parameters List of parameters.
   */
  constructor(dependencies: any, parameters: any[]) {
    super();
    console.log('P:', parameters, 'A:', dependencies.A.count(), 'C:', dependencies.named.count());
  }
}

/**
 * Example of dependent B.
 */
@Injection.Inject(Dependencies.A, Dependencies.B)
@Class.Describe()
class DependentB extends Class.Null {
  /**
   * Default constructor.
   * @param dependencies Map of dependencies.
   * @param parameters List of parameters.
   */
  constructor(dependencies: any, parameters: any[]) {
    super();
    console.log('P:', parameters, 'A:', dependencies.A.count(), 'B:', dependencies.B.count());
  }
}

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
