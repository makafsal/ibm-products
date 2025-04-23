import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('step-provider')
class StepNumberProvider extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

export default StepNumberProvider;
