/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to implement the dependency injection using only
 * the local injection manager.
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
@Class.Describe()
@Manager.Describe()
class DependencyA {
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
@Class.Describe()
@Manager.Describe({ singleton: true })
class DependencyB extends DependencyA {}

/**
 * Example of dependency C.
 * This is a named dependency.
 */
@Class.Describe()
@Manager.Describe({ name: 'named' })
class DependencyC extends DependencyA {}

/**
 * Example of dependent A.
 */
@Class.Describe()
@Manager.Inject(DependencyA, DependencyC)
class DependentA {
  /**
   * Default constructor.
   * @param dependencies Map of dependencies.
   * @param parameters List of parameters.
   */
  constructor(dependencies: any, parameters: any[]) {
    console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'C:', dependencies.named.count());
  }
}

/**
 * Example of dependent B.
 */
@Class.Describe()
@Manager.Inject(DependencyA, DependencyB)
class DependentB {
  /**
   * Default constructor.
   * @param dependencies Map of dependencies.
   * @param parameters List of parameters.
   */
  constructor(dependencies: any, parameters: any[]) {
    console.log('P:', parameters, 'A:', dependencies.DependencyA.count(), 'B:', dependencies.DependencyB.count());
  }
}

/**
 * Construct the instances solving all the dependencies.
 */
const instances = [
  Manager.construct(DependentA, 'Instance 1'),
  Manager.construct(DependentA, 'Instance 2'),
  Manager.construct(DependentB, 'Instance 3'),
  Manager.construct(DependentB, 'Instance 4')
];
