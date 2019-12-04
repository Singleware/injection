/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../source';

import * as Dependencies from './dependencies';

/**
 * Example of dependent with circular dependencies.
 */
@Class.Describe()
class Dependent extends Class.Null {
  /**
   * Injected dependency D.
   */
  @Injection.Inject(Dependencies.D)
  @Class.Private()
  private dependencyD!: Dependencies.D;

  /**
   * Injected dependency E.
   */
  @Injection.Inject(Dependencies.E)
  @Class.Private()
  private dependencyE!: Dependencies.E;

  /**
   * Default constructor.
   * @param parameters List of parameters.
   */
  constructor(...parameters: any[]) {
    super();
    console.log('P:', parameters, 'D:', this.dependencyD.count(), 'E:', this.dependencyE.count());
  }
}

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
