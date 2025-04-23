/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';
import CDSCreateTearsheetStep from './create-tearsheet-step';

export interface Step {
  introStep?: boolean;
  secondaryLabel?: string;
  shouldIncludeStep?: boolean;
  title?: string;
}

export interface StepContextType {
  currentStep: number;
  setStep?: (step: number) => void;
  setOnNext?: (fn: () => void) => void;
  setOnPrevious?: (fn: () => void) => void;
  setStepData?: (data: Record<string, any>) => void;
  steps?: CDSCreateTearsheetStep[];
  registerStep?: (step: CDSCreateTearsheetStep) => void;
}

export const stepContext = createContext<StepContextType>({ currentStep: 1 });
