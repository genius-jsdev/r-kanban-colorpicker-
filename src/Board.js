import React from 'react';
import { KanbanColumn } from './Column';
import { DraggableCard } from './Card';
import { TextForm } from './TextForm';

export function Board({ cards, columns, moveCard, addCard, addColumn }) {
  return (
    <div className="Board">
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          cardCount={column.cardIds.length}
          moveCard={moveCard}
          addCard={addCard.bind(null, column.id)}
        >
          {column.cardIds
            .map(cardId => cards.find(card => card.id === cardId))
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                moveCard={moveCard}
              />
            ))}
        </KanbanColumn>
      ))}
      <div className="Column">
        <TextForm onSubmit={addColumn} placeholder="Add Column..." />
      </div>
    </div>
  );
}
