import React from 'react';
import ListItem from "../list-item/list-item";
import './list.css';

const List = ({things, onDeleted, onToggleImportant, onToggleDone}) => {
    const elements = things.map((item) => {
        const {id, searchVisibility, filterVisibility, ...itemProps} = item;
        let classNames = "list-group-item";

        if (!searchVisibility || !filterVisibility) {
            classNames += " invisible";
        }

        return (
            <li key={id} className={classNames}>
                <ListItem
                    {...itemProps}
                    onDeleted={ () => onDeleted(id) }
                    onToggleImportant={ () => onToggleImportant(id) }
                    onToggleDone={ () => onToggleDone(id) }
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