import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { stepContext, StepContextType } from './step-context';

@customElement('step-provider')
class StepNumberProvider extends LitElement {
  private onNext: () => void = () => {};
  private onPrevious: () => void = () => {};

  // Provide StepsContext

  render() {
    return html`<slot></slot>`;
  }
}

export default StepNumberProvider;
