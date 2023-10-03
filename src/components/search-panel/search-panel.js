import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    constructor() {
        super();
        this.onChangeSearch = () => {

        }
    }

    render () {
        return (
            <input type="text"
            className="form-control search-input"
            placeholder="type to search"
            />
        );
    }
}








