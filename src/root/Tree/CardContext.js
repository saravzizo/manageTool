// CardContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState(() => {
    const localData = localStorage.getItem('cards');
    return localData ? JSON.parse(localData) : [{ id: 'card1', panel: 'left' }];
  });

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleDragStart = (event, card) => {
    event.dataTransfer.effectAllowed = "move";
    setCards(cards.map(c => c.id === card.id ? { ...c, panel: 'dragging' } : c));
  };

  const handleDrop = (cardId) => {
    setCards(cards.map(c => c.id === cardId ? { ...c, panel: 'right' } : c));
  };

  return (
    <CardContext.Provider value={{ cards, handleDragStart, handleDrop }}>
      {children}
    </CardContext.Provider>
  );
}