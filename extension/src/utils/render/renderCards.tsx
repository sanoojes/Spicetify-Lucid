import Card from "@/components/settings/ui/Card";
import CardWrapper from "@/components/settings/ui/CardWrapper";
import type { SettingCardMap } from "@/types/settingTypes";
import React from "react";

export const renderCards = (cards: SettingCardMap) => {
	const groupedCards = new Map<string, SettingCardMap>();

	for (const card of cards) {
		if (!groupedCards.has(card.id)) {
			groupedCards.set(card.id, []);
		}
		groupedCards.get(card.id)?.push(card);
	}

	return Array.from(groupedCards.entries()).map(([cardId, cardGroup]) =>
		cardGroup[0].conditionalRender ? (
			<CardWrapper key={cardId} id={cardId} className={`${cardId} combine`}>
				{cardGroup[0]?.sectionName ? (
					<label aria-label={cardGroup[0]?.sectionName} htmlFor={cardId}>
						{cardGroup[0]?.sectionName}
					</label>
				) : null}
				{cardGroup.map((card) => (card.conditionalRender ? <Card key={card.id} {...card.cardProps} /> : null))}
			</CardWrapper>
		) : null,
	);
};
