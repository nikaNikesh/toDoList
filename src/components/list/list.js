import React from 'react';
import ListItem from "../list-item/list-item";
import './list.css';

const List = ({things, onDeleted, onToggleImportant, omToggleDone}) => {
    const elements = things.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <li key={id} className="list-group-item">
                <ListItem
                    {...itemProps}
                    onDeleted={ () => onDeleted(id) }
                    onToggleImportant={ () => onToggleImportant(id) }
                    onToggleDone={ () => omToggleDone(id) }
                />
            </li>
        );
    });
    return (
        <ul className="list-group list">
            {elements}
        </ul>
    );
};

export default List;