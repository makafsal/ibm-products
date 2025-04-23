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
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';

const storyPrefix = 'create-tearsheet-stories';

// .onNext=${() =>
//   new Promise<void>((resolve, reject) => {
//     setTimeout(() => resolve(), 3000);
//   })}

export const Default = {
  render: () =>
    html`<c4p-create-tearsheet open=${true}>
      <c4p-create-tearsheet-step
        title='Topic name'
        secondaryLabel="Secondary label for Topic name"
        .disableSubmit=${false}
      >
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h2>Topic</h2>
          <cds-text-input
            label="Name"
            id="tearsheet-story-text-input-a"
            class="${storyPrefix}text-input"
          ></cds-text-input>
          <cds-text-input
            label="Category"
            id="tearsheet-story-text-input-b"
            class="${storyPrefix}text-input"
          ></cds-text-input>
        </div>
      </c4p-create-tearsheet-step>
      <c4p-create-tearsheet-step
        title='Location'
        secondaryLabel="Secondary label for location"
      >
        <div class=${`${storyPrefix}__dummy-content-block`}>
        <h2>Location</h2>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Location"
              id="tearsheet-story-text-input-a"
            ></cds-text-input>
          </div>
          </div>
        </div>
      </c4p-create-tearsheet-step>
      <c4p-create-tearsheet-step
        title='Partition'
        secondaryLabel="Secondary label for partition"
      >
        <div class=${`${storyPrefix}__dummy-content-block`}>
        <h2>Partition</h2>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Partition"
              id="tearsheet-story-text-input-a"
            ></cds-text-input>
          </div>
          </div>
        </div>
      </c4p-create-tearsheet-step>
    </c4p-create-tearsheet>`,
};

const meta = {
  title: 'Experimental/CreateTearsheet',
};

export default meta;
