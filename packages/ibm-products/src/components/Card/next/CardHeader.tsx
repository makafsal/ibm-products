/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  Children,
  isValidElement,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CardHeaderProps } from './Card.types';
import { useCardContext } from './CardContext';
import { pkg } from '../../../settings';
import { CardTitleMedia } from './CardTitleMedia';
import { CardMedia } from './CardMedia';

const componentName = 'CardHeader';
const blockClass = `${pkg.prefix}--card-next__header`;

/**
 * CardHeader component - Header section of the card
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const context = useCardContext();
    const cardBlockClass = `${pkg.prefix}--card-next`;

    // Single memoised pass — buckets children by type using direct references.
    // Replaces the previous two-pass pattern (toArray+some then forEach).
    const { titleMediaElements, mediaElements, otherContent, hasTitleMedia } =
      useMemo(() => {
        const titleMedia: ReactNode[] = [];
        const media: ReactNode[] = [];
        const other: ReactNode[] = [];

        Children.forEach(children, (child) => {
          if (isValidElement(child) && child.type === CardTitleMedia) {
            titleMedia.push(child);
          } else if (isValidElement(child) && child.type === CardMedia) {
            media.push(child);
          } else {
            other.push(child);
          }
        });

        return {
          titleMediaElements: titleMedia,
          mediaElements: media,
          otherContent: other,
          hasTitleMedia: titleMedia.length > 0,
        };
      }, [children]);

    const handleDecoratorClick = useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      []
    );

    const handleDecoratorKeyDown = useCallback(
      (e: React.KeyboardEvent) => e.stopPropagation(),
      []
    );

    const headerClasses = cx(blockClass, className);

    return (
      <div {...rest} ref={ref} className={headerClasses}>
        {hasTitleMedia ? (
          <>
            {mediaElements}
            <div className={`${cardBlockClass}__header-content`}>
              {titleMediaElements}
              <div className={`${cardBlockClass}__title-content`}>
                {otherContent}
              </div>
            </div>
          </>
        ) : (
          children
        )}
        {context.decorator && (
          <div
            className={`${cardBlockClass}__decorator`}
            role="presentation"
            onClick={handleDecoratorClick}
            onKeyDown={handleDecoratorKeyDown}
          >
            {context.decorator}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = componentName;

CardHeader.propTypes = {
  /**
   * Header content
   */
  children: PropTypes.node,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};
