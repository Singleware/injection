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
@Class.Describe()
class DependentA extends Class.Null {
  /**
   * Injected dependency A.
   */
  @Injection.Inject(Dependencies.A)
  @Class.Private()
  private dependencyA!: Dependencies.A;

  /**
   * Injected dependency C.
   */
  @Injection.Inject(Dependencies.C)
  @Class.Private()
  private dependencyC!: Dependencies.C;

  /**
   * Default constructor.
   * @param parameters List of parameters.
   */
  constructor(...parameters: any[]) {
    super();
    console.log('P:', parameters, 'A:', this.dependencyA.count(), 'C:', this.dependencyC.count());
  }
}

/**
 * Example of dependent B.
 */
@Class.Describe()
class DependentB extends Class.Null {
  /**
   * Injected dependency A.
   */
  @Injection.Inject(Dependencies.A)
  @Class.Private()
  private dependencyA!: Dependencies.A;

  /**
   * Injected dependency B.
   */
  @Injection.Inject(Dependencies.B)
  @Class.Private()
  private dependencyB!: Dependencies.B;

  /**
   * Default constructor.
   * @param parameters List of parameters.
   */
  constructor(...parameters: any[]) {
    super();
    console.log('P:', parameters, 'A:', this.dependencyA.count(), 'B:', this.dependencyB.count());
  }

  @Class.Public()
  public count(): void {
    console.log('A:', this.dependencyA.count(), 'B:', this.dependencyB.count());
  }
}

/**
 * Construct the instances solving all the dependencies.
 */
[new DependentA('Instance 1'), new DependentA('Instance 2'), new DependentB('Instance 3'), new DependentB('Instance 4'), new DependentB('Instance 5')];
