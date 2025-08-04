import type { SectionProps } from '@app/types/settingSchema.ts';
import Group from '@components/settings/ui/Group.tsx';
import React, { type FC, memo } from 'react';

const Section: FC<SectionProps> = ({ groups, sectionName, visible }) => {
  const isVisible = visible ? visible() : true;
  return (
    <div className={`section${!isVisible ? ' hidden' : ''}`}>
      <h2 className="section-header encore-text encore-text-title-small encore-internal-color-text-base">
        {sectionName}
      </h2>
      <div className="row-wrapper">
        {groups.map((v) => (
          <Group key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
};

export default Section;
