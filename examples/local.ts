/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../source';

/**
 * Creates a local dependency manager.
 */
const Manager = new Injection.Manager();

/**
 * Example of dependency A.
 */
@Manager.Describe()
@Class.Describe()
class DependencyA extends Class.Null {
  @Class.Private()
  private counter = 0;

  @Class.Public()
  public count(): number {
    return this.counter++;
  }
}

/**
 * Example of dependency B.
 * This is a singleton dependency.
 */
@Manager.Describe({ singleton: true })
@Class.Describe()
class DependencyB extends DependencyA {}

/**
 * Example of dependency C.
 * This is a named dependency.
 */
@Manager.Describe({ name: 'named' })
@Class.Describe()
class DependencyC extends DependencyA {}

/**
 * Example of dependent A.
 */
@Manager.Inject(DependencyA, DependencyC)
@Class.Describe()
class DependentA extends Class.Null {
  /**
   * Default constructor.
   * @param dependencies Map of dependencies.
   * @param parameters List of parameters.
   */
  constructor(dependencies: any, parameters: any[]) {
    super();
    console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'C:', dependencies.named.count());
  }
}

/**
 * Example of dependent B.
 */
@Manager.Inject(DependencyA, DependencyB)
@Class.Describe()
class DependentB extends Class.Null {
  /**
   * Default constructor.
   * @param dependencies Map of dependencies.
   * @param parameters List of parameters.
   */
  constructor(dependencies: any, parameters: any[]) {
    super();
    console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'B:', dependencies.DependencyB.count());
  }
}

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
