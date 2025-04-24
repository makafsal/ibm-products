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
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/progress-bar/index.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { prefix } from '../../globals/settings';
import '../tearsheet';
import { property, state } from 'lit/decorators.js';
import {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_WIDTH,
} from '../tearsheet/defs';
import { stepContext, StepContextType } from './step-context';
import { provide } from '@lit/context';
import CDSCreateTearsheetStep from './create-tearsheet-step';
/**
 * CreateTearsheet.
 *
 * @element c4p-create-tearsheet
 *
 * @fires c4p-create-tearsheet-next-step
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
    registerStep: (step: CDSCreateTearsheetStep) => {
      if (this.stepsData?.steps && !this.stepsData.steps.includes(step)) {
        this.stepsData = {
          ...this.stepsData,
          steps: [...this.stepsData.steps, step],
        };
      }
    },
  };

  private _continueToNextStep() {
    if (
      this.stepsData?.steps &&
      this.stepsData.currentStep + 1 < this.stepsData?.steps?.length
    ) {
      this.stepsData = {
        ...this.stepsData,
        currentStep: this.stepsData.currentStep + 1,
      };
    }
  }

  private async _handleOnNext() {
    const currentStepElement = this.stepsData?.steps?.[
      this.stepsData?.currentStep
    ] as any;
    if (currentStepElement?.onNext) {
      try {
        await currentStepElement.onNext();
        this._continueToNextStep();
      } catch (error) {
        return;
      }
    } else {
      this._continueToNextStep();
    }
  }

  private _handleOnBack() {
    if (this.stepsData?.steps) {
      this.stepsData = {
        ...this.stepsData,
        currentStep: this.stepsData.currentStep - 1,
      };
    }
  }

  private _handleCancel(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSCreateTearsheet).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSCreateTearsheet).eventClose,
            init
          )
        );
      }
    }
  }

  render() {
    const currentStepElement =
      this.stepsData?.steps?.[this.stepsData?.currentStep];

    const buttonRenderer = currentStepElement?.buttonRenderer;

    return html`<c4p-tearsheet
      ?open=${this.open}
      influencer-placement=${TEARSHEET_INFLUENCER_PLACEMENT.LEFT}
      width=${TEARSHEET_WIDTH.WIDE}
    >
      <!-- Tearsheet title -->
      <span slot="title">${'Create Tearsheet'}</span>

      <!-- Step content -->
      <div>${currentStepElement}</div>

      <!-- Progress Indicator -->
      <cds-progress-indicator vertical slot="influencer">
        ${this.stepsData?.steps?.map((step, index) => {
          const state =
            this.stepsData && index < this.stepsData?.currentStep
              ? 'complete'
              : index === this.stepsData?.currentStep
                ? 'current'
                : 'incomplete';

          return html`
            <cds-progress-step
              state=${state}
              label=${step.title}
              secondary-label=${step?.secondaryLabel}
              description=${step?.description}
            ></cds-progress-step>
          `;
        })}
      </cds-progress-indicator>

      <!-- Actions -->
      ${buttonRenderer
        ? buttonRenderer({
            currentStep: this.stepsData.currentStep,
            handleNext: this._handleOnNext.bind(this),
            numSteps: this.stepsData?.steps?.length,
            handleGoToStep: (step: number) => {
              this.stepsData = { ...this.stepsData, currentStep: step };
            },
            setFormState: () => {},
            handlePrevious: this._handleOnBack.bind(this),
            handleCancel: this._handleCancel.bind(this),
            formState: {},
          })
        : null}
    </c4p-tearsheet>`;
  }

  /**
   * The name of the custom event fired when click on cancel button
   */
  static get eventBeforeClose() {
    return `${prefix}-create-tearsheet-before-close`;
  }

  /**
   * The name of the custom event fired when click on cancel button
   */
  static get eventClose() {
    return `${prefix}-create-tearsheet-close`;
  }
}

export default CDSCreateTearsheet;
