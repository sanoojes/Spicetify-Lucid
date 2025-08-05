import type { DropdownProps } from '@app/types/uiSchema.ts';
import Dropdown from '@components/ui/Dropdown.tsx';
import React, { type FC } from 'react';

const DropdownAction: FC<DropdownProps> = ({ value, onChange, options }) => {
  const selectedLabel = options.find(([, val]) => val === value)?.[0] ?? 'Select';

  return (
    <Dropdown>
      <Dropdown.Button>{selectedLabel}</Dropdown.Button>
      <Dropdown.Content>
        <Dropdown.List>
          {options.map(([label, val]) => (
            <Dropdown.Item key={val} onClick={() => onChange(val)}>
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default DropdownAction;
