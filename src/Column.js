import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { TextForm } from './TextForm';

// export function Column(props) {
//   return (
//     <div className="Column">
//       <div className="Column__title">Leader</div>
//       {props.children}
//       <TextForm onSubmit={props.addCard} placeholder="Add card..." />
//     </div>
//   );
// }

const boxTarget = {
  // drop(props) {
  //   return { name: props.status };
  // }, 
  hover(props, monitor) {
    const {cardCount, id} = props;
    const draggingItem = monitor.getItem();
    if (cardCount === 0) {
      props.moveCard(draggingItem.id, id, 0);
    }
  },
};

function Column(props) {
  return props.connectDropTarget(
    <div className="Column">
      <div className="Column__title">Leader</div>
      {props.children}
      <TextForm onSubmit={props.addCard} placeholder="Add card..." />
    </div>
  );
}

export const KanbanColumn = DropTarget("Card", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Column);