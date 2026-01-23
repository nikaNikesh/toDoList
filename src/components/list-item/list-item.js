import React, {Component} from "react";
import './list-item.css';

export default class ListItem extends Component {

    render() {
        const {content, onDeleted, onToggleDone, onToggleImportant, important, done} = this.props;
        let classNames = 'list-item';

        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <span className={classNames}>
                <span className='list-item-label'
                      onClick={onToggleDone} >
                      {content}
                </span>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o"/>
                </button>

                <button type="button"
                        className="btn btn-outline-primary btn-sm float-right"
                        onClick={onToggleImportant} >
                    <i className="fa fa-exclamation"/>
                </button>
            </span>
        )
    }
}
