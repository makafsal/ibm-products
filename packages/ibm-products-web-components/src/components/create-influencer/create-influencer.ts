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
      ${this.stepData?.steps?.map((step, index) => {
        const state =
          this.stepData && index < this.stepData?.currentStep
            ? 'complete'
            : index === this.stepData?.currentStep
              ? 'current'
              : 'incomplete';

        return html`
          <cds-progress-step
            state=${state}
            label=${step.title || `Step ${index + 1}`}
            secondary-label=${step?.secondaryLabel}
            description=${`Step ${index + 1}: Description here`}
          ></cds-progress-step>
        `;
      })}
    </cds-progress-indicator>`;
  }
}

export default CDSCreateInfluencer;
