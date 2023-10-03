import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }

        this.onContentChange = (e) => {
            this.setState({
                content: e.target.value
            });
        }

        this.onSubmit = (e) => {
            e.preventDefault();
            this.props.onItemAdded(this.state.content);
            this.setState({
                content: ''
            });
        }
    }


    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.onContentChange}
                       placeholder="What needs to be done"
                       value={this.state.content}/>
                <button
                    className="btn btn-outline-secondary"
                >
                    Add Item
                </button>
            </form>
        )
    }

}