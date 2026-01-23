import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    constructor() {
        super();
        this.state = {
            styles: {
                classNameAll: 'btn btn-dark',
                classNameActive: 'btn btn-outline-dark',
                classNameDone: 'btn btn-outline-dark',
            }
        }

        this.changeStyleOnActiveBtn = (propsName) => {
            this.setState(({styles}) => {
                const newStyles = {
                    classNameAll: 'btn btn-outline-dark',
                    classNameActive: 'btn btn-outline-dark',
                    classNameDone: 'btn btn-outline-dark',
                }
                newStyles[propsName] = 'btn btn-dark';

                return {
                    styles: newStyles
                }
            })
        }
    }

    render() {
        let {classNameAll, classNameActive, classNameDone} = this.state.styles;

        return (
            <div className="btn-group">
                <button type="button"
                        className={classNameAll}
                        onClick={() => { this.props.onFilterAll(); this.changeStyleOnActiveBtn('classNameAll');}}>All
                </button>
                <button type="button"
                        className={classNameActive}
                        onClick={() => { this.props.onFilterActive(); this.changeStyleOnActiveBtn('classNameActive'); }}>Active
                </button>
                <button type="button"
                        className={classNameDone}
                        onClick={() => { this.props.onFilterDone(); this.changeStyleOnActiveBtn('classNameDone');}}>Done
                </button>
            </div>
        );
    }
}

