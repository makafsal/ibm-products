/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import './create-tearsheet-step';

export const Default = {
  render: () =>
    html`<c4p-create-tearsheet open=${true}>
      <c4p-create-tearsheet-step slot="content" title="Step 1">
        Hey 1
      </c4p-create-tearsheet-step>
      <c4p-create-tearsheet-step slot="content" title="Step 2">
        Hey 2
      </c4p-create-tearsheet-step>
    </c4p-create-tearsheet>`,
};

const meta = {
  title: 'Experimental/CreateTearsheet',
};

export default meta;
