/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { prefix } from '../../globals/settings';
import '../tearsheet';
import { property, state } from 'lit/decorators.js';
import {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_WIDTH,
} from '../tearsheet/defs';
import { BUTTON_KIND } from '@carbon/web-components/es/components/button/defs';
import '../create-influencer';
import { stepContext, StepContextType } from './step-context';
import { provide } from '@lit/context';
/**
 * CreateTearsheet.
 *
 * @element c4p-create-tearsheet
 */

@customElement(`${prefix}-create-tearsheet`)
class CDSCreateTearsheet extends HostListenerMixin(LitElement) {
  /**
   * `true` if the tearsheet should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  @provide({ context: stepContext })
  stepsData: StepContextType = {
    currentStep: 0,
    steps: [],
    registerStep: (step: HTMLElement) => {
      if (this.stepsData?.steps) {
        this.stepsData = {
          ...this.stepsData,
          steps: [...this.stepsData.steps, step],
        };
      }
    },
  };

  onNext() {
    this.stepsData = {
      ...this.stepsData,
      currentStep: this.stepsData.currentStep + 1,
    };
  }

  render() {
    // const steps = Array.from(this.children).filter(
    //   (child) => child.slot === 'content'
    // );

    // console.log(this.children, steps, this.stepsData.currentStep);

    return html`<c4p-tearsheet
      ?open=${this.open}
      influencer-placement=${TEARSHEET_INFLUENCER_PLACEMENT.LEFT}
      width=${TEARSHEET_WIDTH.WIDE}
    >
      <!-- Tearsheet title -->
      <span slot="title">${'Create Tearsheet'}</span>

      <!-- Step content -->
      <div>${this.stepsData?.steps?.[this.stepsData?.currentStep]}</div>

      <!-- Progress Indicator -->
      <c4p-create-influencer slot="influencer"></c4p-create-influencer>

      <!-- Actions -->
      <cds-button
        key=${BUTTON_KIND.TERTIARY}
        slot="actions"
        kind=${BUTTON_KIND.TERTIARY}
      >
        Cancel
      </cds-button>
      <cds-button
        key=${BUTTON_KIND.SECONDARY}
        slot="actions"
        kind=${BUTTON_KIND.SECONDARY}
      >
        Back
      </cds-button>
      <cds-button
        key=${BUTTON_KIND.PRIMARY}
        slot="actions"
        kind=${BUTTON_KIND.PRIMARY}
        @click=${this.onNext}
      >
        Next
      </cds-button>
    </c4p-tearsheet>`;
  }
}

export default CDSCreateTearsheet;
