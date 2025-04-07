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
import { customElement, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { consume } from '@lit/context';
import { stepContext, StepContextType } from './step-context';

@customElement(`${prefix}-create-tearsheet-step`)
class CDSCreateTearsheetStep extends HostListenerMixin(LitElement) {
  @property({ type: String, reflect: true }) title = '';

  @consume({ context: stepContext })
  stepData?: StepContextType;

  connectedCallback() {
    console.log('here ', this);
    super.connectedCallback();
    this.stepData?.registerStep?.(this);
  }

  render() {
    return html` <div>
      ${this.title}
      <slot></slot>
    </div>`;
  }
}

export default CDSCreateTearsheetStep;
