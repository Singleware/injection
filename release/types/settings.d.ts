/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Dependency settings interface.
 */
export interface Settings {
  /**
   * Dependency name.
   * When provided, use it instead of the class name.
   */
  name?: string;
  /**
   * Determines whether the injected dependency must be a singleton instance.
   */
  singleton?: boolean;
}
