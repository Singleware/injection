/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../../source';

import * as Dependencies from './e';

/**
 * Example of dependency D.
 * This is a named dependency.
 */
@Injection.Describe({ singleton: true, name: 'named' })
@Class.Describe()
export class D extends Class.Null {
  /**
   * Dependency counter.
   */
  @Class.Private()
  private counter = 0;

  /**
   * Injected dependency.
   */
  @Injection.Inject(() => Dependencies.E)
  @Class.Private()
  private module!: Dependencies.E;

  /**
   * Increase the dependency counter.
   * @returns Returns the current counter value.
   */
  @Class.Public()
  public count(): number {
    return this.module.helper(this.counter++);
  }

  /**
   * Helper function.
   * @param value Input value.
   * @returns Return the input value multiplied by 10.
   */
  @Class.Public()
  public helper(value: number): number {
    return value * 10;
  }
}
