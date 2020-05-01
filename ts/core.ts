'use strict';
export * from './elem/index';

import { createPopper } from '@popperjs/core';
Object.assign(window, { createPopper });
