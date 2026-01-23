import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    render() {

        return (
            <input type="text"
                   className="search-input"
                   onChange={(event) => this.props.onToggleSearch(event)}
                   placeholder="type to search"
            />
        );
    }
}



