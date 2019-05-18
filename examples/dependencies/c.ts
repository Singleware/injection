/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Injection from '../../source';

import { A } from './a';

/**
 * Example of dependency C.
 * This is a named dependency.
 */
@Injection.Describe({ name: 'named' })
@Class.Describe()
export class C extends A {}
