/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Dependency settings interface.
 */
export interface Settings {
  /**
   * Name of dependency, when provided uses it instead of the class name.
   */
  name?: string;
  /**
   * Determines whether the injected dependency must be a singleton instance.
   */
  singleton?: boolean;
}
