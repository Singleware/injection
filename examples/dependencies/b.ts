/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../../source';

import { A } from './a';

/**
 * Example of dependency B.
 * This is a singleton dependency.
 */
@Injection.Describe({ singleton: true })
@Class.Describe()
export class B extends A {}
