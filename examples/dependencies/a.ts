/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../../source';

/**
 * Example of dependency A.
 */
@Injection.Describe()
@Class.Describe()
export class A extends Class.Null {
  /**
   * Dependency counter.
   */
  @Class.Private()
  private counter = 0;

  /**
   * Increase the dependency counter.
   * @returns Returns the current counter value.
   */
  @Class.Public()
  public count(): number {
    return this.counter++;
  }
}
