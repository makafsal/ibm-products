/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/progress-bar/index.js';
import { consume } from '@lit/context';
import { stepContext, StepContextType } from '../create-tearsheet/step-context';

/**
 * CreateInfluencer.
 *
 * @element c4p-create-influencer
 */

@customElement(`${prefix}-create-influencer`)
class CDSCreateInfluencer extends HostListenerMixin(LitElement) {
  @consume({ context: stepContext, subscribe: true })
  stepData?: StepContextType;

  render() {
    return html`<cds-progress-indicator vertical>
      <cds-progress-step
        state="complete"
        label="First step ${this.stepData?.currentStep}"
        secondary-label="Optional label"
        description="Step 1: Getting started with Carbon Design System"
      ></cds-progress-step>
      <cds-progress-step
        label="Second step with tooltip"
        state="current"
      ></cds-progress-step>
      <cds-progress-step
        label="Third step with tooltip"
        state="incomplete"
      ></cds-progress-step>
      <cds-progress-step
        label="Fourth step"
        secondary-label="Example invalid step"
        state="invalid"
      ></cds-progress-step>
      <cds-progress-step
        disabled
        label="Fifth step"
        state="incomplete"
      ></cds-progress-step>
    </cds-progress-indicator>`;
  }
}

export default CDSCreateInfluencer;
