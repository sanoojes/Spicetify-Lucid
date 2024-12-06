import Card from "@/components/settings/ui/Card";
import CardWrapper from "@/components/settings/ui/CardWrapper";
import type { SettingCardMap } from "@/types/settingTypes";
import React, { useState } from "react";

export const renderCards = (cards: SettingCardMap) => {
  const [cardGroups, setCardGroups] = useState<Map<string, SettingCardMap>>(
    new Map()
  );

  React.useEffect(() => {
    const newCardGroups = new Map<string, SettingCardMap>();
    for (const card of cards) {
      if (!newCardGroups.has(card.id)) {
        newCardGroups.set(card.id, []);
      }
      newCardGroups.get(card.id)?.push(card);
    }
    setCardGroups(newCardGroups);
  }, [cards]);

  return Array.from(cardGroups.entries()).map(([cardId, cardGroup]) => {
    const visibleCards = cardGroup.filter((card) => card.conditionalRender);

    if (visibleCards.length > 0) {
      return (
        <CardWrapper key={cardId} id={cardId} className={`${cardId} combine`}>
          {visibleCards[0]?.sectionName ? (
            <label aria-label={visibleCards[0]?.sectionName} htmlFor={cardId}>
              {visibleCards[0]?.sectionName}
            </label>
          ) : null}
          {visibleCards.map((card) => (
            <Card key={card.id} {...card.cardProps} />
          ))}
        </CardWrapper>
      );
    } else {
      return null;
    }
  });
};
