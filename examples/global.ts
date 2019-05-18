/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../source';

/**
 * Example of dependency A.
 */
@Injection.Describe()
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
@Injection.Describe({ singleton: true })
@Class.Describe()
class DependencyB extends DependencyA {}

/**
 * Example of dependency C.
 * This is a named dependency.
 */
@Injection.Describe({ name: 'named' })
@Class.Describe()
class DependencyC extends DependencyA {}

/**
 * Example of dependent A.
 */
@Injection.Inject(DependencyA, DependencyC)
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
@Injection.Inject(DependencyA, DependencyB)
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
  Injection.construct(DependentA, 'Instance 1'),
  Injection.construct(DependentA, 'Instance 2'),
  Injection.construct(DependentB, 'Instance 3'),
  Injection.construct(DependentB, 'Instance 4'),
  Injection.construct(DependentB, 'Instance 5')
];
