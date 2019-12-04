/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../../source';

import * as Dependencies from './d';

/**
 * Example of dependency E.
 * This is a named dependency.
 */
@Injection.Describe({ singleton: true, name: 'named' })
@Class.Describe()
export class E extends Class.Null {
  /**
   * Dependency counter.
   */
  @Class.Private()
  private counter = 0;

  /**
   * Injected dependency.
   */
  @Injection.Inject(() => Dependencies.D)
  @Class.Private()
  private module!: Dependencies.D;

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
   * @returns Return the input value multiplied by 20.
   */
  @Class.Public()
  public helper(value: number): number {
    return value * 20;
  }
}
