import React from "react";
import { Icon } from "../../components/icon/icon.css";
import {
  CardsBlockWrapper,
  CardsBlockContainer,
  CardsGrid,
  Card,
  CardIconWrapper,
  CardTitle,
  CardDescription,
  cardCSSVars,
} from "./cards-block.css";

export interface CardTheme {
  color: string;
  glowColor: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

interface CardItemProps {
  icon: string;
  title: string;
  description: string;
  theme: CardTheme;
}

export interface CardsBlockProps {
  title?: React.ReactNode;
  cards: CardItemProps[];
  children?: React.ReactNode;
  defaultThemes?: CardTheme[];
  columns?: "two" | "three" | "four";
}

export const CardsBlock: React.FC<CardsBlockProps> = ({
  title,
  cards,
  children,
  columns = "three",
}) => {
  return (
    <CardsBlockWrapper>
      <CardsBlockContainer>
        {title}
        {children}
        <CardsGrid columns={columns}>
          {cards.map((card, index) => {
            const theme = card.theme;

            // Build CSS variables object
            const cssVars = {
              [cardCSSVars.cardColor]: theme.color,
              [cardCSSVars.cardGlowColor]: theme.glowColor,
              [cardCSSVars.cardBgColor]: theme.bgColor || "#0A0A0A",
              [cardCSSVars.cardBorderColor]: theme.borderColor || "#333333",
              [cardCSSVars.cardTextColor]: theme.textColor || "#AAAAAA",
            };

            return (
              <Card key={index} style={cssVars}>
                <CardIconWrapper>
                  <Icon
                    css-src={card.icon}
                    style={{ width: "100%", height: "100%" }}
                  />
                </CardIconWrapper>
                <CardTitle element="h3">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </Card>
            );
          })}
        </CardsGrid>
      </CardsBlockContainer>
    </CardsBlockWrapper>
  );
};
