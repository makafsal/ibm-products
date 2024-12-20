/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import * as GlobalFeatureFlags from '@carbon/feature-flags';
import { render } from '@testing-library/react';
import { FeatureFlags, useFeatureFlags, useFeatureFlag } from '.';

GlobalFeatureFlags.merge({
  test: 123,
});

describe('FeatureFlags', () => {
  it('should default to the global feature flag scope', () => {
    GlobalFeatureFlags.add('enable-feature-flags-test', true);

    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const featureFlag = useFeatureFlag('enable-feature-flags-test');

      checkFlags(featureFlags.enabled('enable-feature-flags-test'));
      checkFlag(featureFlag);

      return null;
    }

    render(<TestComponent />);

    expect(checkFlags).toHaveBeenLastCalledWith(true);
    expect(checkFlag).toHaveBeenLastCalledWith(true);
  });

  it('should provide access to the feature flags for a scope', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const a = useFeatureFlag('a');

      checkFlags({
        a: featureFlags.enabled('a'),
      });

      checkFlag({
        a,
      });

      return null;
    }

    render(
      <FeatureFlags a>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      a: true,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      a: true,
    });
  });

  it('should merge scopes and overwrite duplicate keys', () => {
    GlobalFeatureFlags.add('global', true);

    const checkFlag = jest.fn();

    function TestComponent() {
      const global = useFeatureFlag('global');
      const local = useFeatureFlag('local');

      checkFlag({ global, local });

      return null;
    }

    const { rerender } = render(
      <FeatureFlags local>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: true,
      local: true,
    });

    render(
      <FeatureFlags local>
        <FeatureFlags global={false}>
          <TestComponent />
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: false,
      local: true,
    });

    render(
      <FeatureFlags local>
        <FeatureFlags global={false}>
          <FeatureFlags local={false}>
            <TestComponent />
          </FeatureFlags>
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: false,
      local: false,
    });

    rerender(
      <FeatureFlags local>
        <FeatureFlags global={false}>
          <FeatureFlags local>
            <TestComponent />
          </FeatureFlags>
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: false,
      local: true,
    });
  });
});
