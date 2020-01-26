import React, { useState } from 'react';
// import { DragDropContext } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { KanbanColumn } from './Column';
import { DraggableCard } from './Card';
import { TextForm } from './TextForm';

let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
}));

const initialColumns = ['TODO', 'Doing', 'Done'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map(card => card.id),
}));

console.log(initialColumns);

export default function Kanban() {
  const [cards, setCards] = useState(initialCards);
  const [columns, setColumns] = useState(initialColumns);

  const addColumn = _title => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: [],
    };

    setColumns([...columns, newColumn]);
  };

  const addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = { id: ++_cardId, title };
    setCards([...cards, newCard]);
    setColumns(columns.map(
      column =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
    ));
  };

  const moveCard = (cardId, destColumnId, index) => {
    setColumns(
      columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>

  );
}

// export default DragDropContext(HTML5Backend)(App);
