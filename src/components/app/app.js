import Header from "../header/header";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import List from "../list/list";
import ItemAddForm from "../item-add-form/item-add-form";
import React, {Component} from "react";

export default class App extends Component {
    constructor() {
        super();
        this.minIdAddItem = 100;
        this.createItem = function (content) {
            return {
                content: content,
                important: false,
                done: false,
                id: this.minIdAddItem++
            }
        }

        this.state = {
            listData: [
                this.createItem('learn React'),
                this.createItem('create the first app'),
                this.createItem('to wash clothes')
            ],
        }


        this.deleteItem = (id) => {
            this.setState(({listData}) => {
                    const idDelete = listData.findIndex((elem) => elem.id === id);
                    const newListData = [
                        ...listData.slice(0, idDelete),
                        ...listData.slice(idDelete + 1)
                    ];
                    return {
                        listData: newListData
                    }
                }
            )
        }
        this.addItem = (content) => {
            const newItemArray = this.createItem(content);

            this.setState(({listData}) => {
                    const newArray = [
                        ...listData,
                        newItemArray
                    ];
                    return ({
                        listData: newArray
                    });
                }
            )
        }

        this.toggleProperty = (array, id, propName) => {
                const idDelete = array.findIndex((elem) => elem.id === id);
                const oldItem = array[idDelete];
                const newItem = {
                    ...oldItem,
                    [propName]: !oldItem[propName]
                };
                return [
                        ...array.slice(0, idDelete),
                        newItem,
                        ...array.slice(idDelete + 1)
                ];

        }

        this.onToggleDone = (id) => {
            this.setState( ({ listData }) => {
                return {
                    listData: this.toggleProperty(listData, id, 'done')
                }
            });
        };


        this.onToggleImportant = (id) => {
             this.setState( ({ listData }) => {
                return {
                    listData: this.toggleProperty(listData, id, 'important')
                }
            });
        };


    }


    render() {
        const {listData} = this.state;
        const doneCount = listData.filter((el) => el.done).length;
        const todoCount = listData.length - doneCount;

        return (
            <div className="todo-app">
                <Header toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <List things={listData}
                      onDeleted={this.deleteItem}
                      onToggleImportant={this.onToggleImportant}
                      omToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}
                />
            </div>
        );
    }
}