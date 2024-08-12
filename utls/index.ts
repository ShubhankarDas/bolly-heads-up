export const getRandomCard = (cards: string[]) => {
  if (!cards.length) return null;
  return cards[Math.floor(Math.random() * cards.length)];
};

export const getDeckFromTitle = (decks: any[], title: string | undefined) => {
  if (!title) return null;
  return decks.find((deck) => deck.title === title);
};
