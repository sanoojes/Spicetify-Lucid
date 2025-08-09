import { QuestionCircle20Regular } from '@fluentui/react-icons';
import React, { type FC, type ReactNode } from 'react';

type TippyProps = {
  label: ReactNode;
  children?: ReactNode;
  hasIcon?: boolean;
};

const Tippy: FC<TippyProps> = ({ label, children, hasIcon = true }) => {
  if (!label || !Spicetify?.ReactComponent?.TooltipWrapper) return null;

  return (
    <Spicetify.ReactComponent.TooltipWrapper
      label={label}
      showDelay={0}
      placement="top"
      trigger="mouseenter"
    >
      <div className="x-settings-tooltip">
        {children}
        {hasIcon ? (
          <div className="x-settings-tooltipIconWrapper">
            <QuestionCircle20Regular />
          </div>
        ) : null}
      </div>
    </Spicetify.ReactComponent.TooltipWrapper>
  );
};

export default Tippy;
