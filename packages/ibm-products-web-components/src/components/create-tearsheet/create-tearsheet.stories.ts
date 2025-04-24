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
import { BUTTON_KIND } from '@carbon/web-components/es/components/button/defs.js';

import { prefix } from '../../globals/settings';
const storyPrefix = 'create-tearsheet-stories';

const toggleButton = () => {
  document.querySelector(`${prefix}-create-tearsheet`)?.toggleAttribute('open');
};

export const Default = {
  render: () =>
    html` <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}"
            >Open create tearsheet</cds-button
          >
        </div>
      </div>
      <c4p-create-tearsheet ?open=${true}>
        <c4p-create-tearsheet-step
          title="Topic name"
          secondaryLabel="Secondary label for Topic name"
          .disableSubmit=${false}
          .buttonRenderer=${({
            currentStep,
            handleNext,
            numSteps,
            handleGoToStep,
            setFormState,
            handlePrevious,
            handleCancel,
            formState,
          }) => html`
            <cds-button
              key=${BUTTON_KIND.GHOST}
              slot="actions"
              kind=${BUTTON_KIND.GHOST}
              @click=${handleCancel}
            >
              Cancel
            </cds-button>
            <cds-button
              key=${BUTTON_KIND.SECONDARY}
              slot="actions"
              kind=${BUTTON_KIND.SECONDARY}
              size=${'2xl'}
              @click=${handlePrevious}
              ?disabled=${currentStep === 0}
            >
              Back
            </cds-button>
            <cds-button
              key=${BUTTON_KIND.PRIMARY}
              slot="actions"
              kind=${BUTTON_KIND.PRIMARY}
              size="2xl"
              @click=${() => {
                if (currentStep === numSteps - 1) {
                  setFormState({});
                  handleGoToStep(0);
                } else {
                  handleNext();
                }
              }}
            >
              ${currentStep === numSteps - 1 ? 'Submit' : 'Next'}
            </cds-button>
          `}
        >
          <div class="${storyPrefix}__dummy-content-block">
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
          title="Location"
          secondaryLabel="Secondary label for location"
          .buttonRenderer=${({
            currentStep,
            handleNext,
            numSteps,
            handleGoToStep,
            setFormState,
            handlePrevious,
            handleCancel,
            formState,
          }) => html`
            <cds-button
              key=${BUTTON_KIND.GHOST}
              slot="actions"
              kind=${BUTTON_KIND.GHOST}
              @click=${handleCancel}
            >
              Cancel
            </cds-button>
            <cds-button
              key=${BUTTON_KIND.SECONDARY}
              slot="actions"
              kind=${BUTTON_KIND.SECONDARY}
              @click=${handlePrevious}
              ?disabled=${currentStep === 0}
            >
              Back
            </cds-button>
            <cds-button
              key=${BUTTON_KIND.PRIMARY}
              slot="actions"
              kind=${BUTTON_KIND.PRIMARY}
              @click=${() => {
                if (currentStep === numSteps - 1) {
                  setFormState({});
                  handleGoToStep(0);
                } else {
                  handleNext();
                }
              }}
            >
              ${currentStep === numSteps - 1 ? 'Submit' : 'Next'}
            </cds-button>
          `}
        >
          <div class="${storyPrefix}__dummy-content-block">
            <h2>Location</h2>
            <cds-text-input
              label="Location"
              id="tearsheet-story-text-input-c"
            ></cds-text-input>
          </div>
        </c4p-create-tearsheet-step>

        <c4p-create-tearsheet-step
          title="Partition"
          secondaryLabel="Secondary label for partition"
          .buttonRenderer=${({
            currentStep,
            handleNext,
            numSteps,
            handleGoToStep,
            setFormState,
            handlePrevious,
            handleCancel,
            formState,
          }) => html`
            <cds-button
              key=${BUTTON_KIND.GHOST}
              slot="actions"
              kind=${BUTTON_KIND.GHOST}
              @click=${handleCancel}
            >
              Cancel
            </cds-button>
            <cds-button
              key=${BUTTON_KIND.SECONDARY}
              slot="actions"
              kind=${BUTTON_KIND.SECONDARY}
              @click=${handlePrevious}
              ?disabled=${currentStep === 0}
            >
              Back
            </cds-button>
            <cds-button
              key=${BUTTON_KIND.PRIMARY}
              slot="actions"
              kind=${BUTTON_KIND.PRIMARY}
              @click=${() => {
                if (currentStep === numSteps - 1) {
                  setFormState({});
                  handleGoToStep(0);
                } else {
                  handleNext();
                }
              }}
            >
              ${currentStep === numSteps - 1 ? 'Submit' : 'Next'}
            </cds-button>
          `}
        >
          <div class="${storyPrefix}__dummy-content-block">
            <h2>Partition</h2>
            <cds-text-input
              label="Partition"
              id="tearsheet-story-text-input-d"
            ></cds-text-input>
          </div>
        </c4p-create-tearsheet-step>
      </c4p-create-tearsheet>`,
};

const meta = {
  title: 'Experimental/CreateTearsheet',
};

export default meta;
