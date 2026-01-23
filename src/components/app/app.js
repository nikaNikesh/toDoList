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
                id: this.minIdAddItem++,
                searchVisibility: true,
                filterVisibility: true
            }
        }

        this.state = {
            listData: [
                this.createItem('fix the header layout'),
                this.createItem('read about CSS Flexbox'),
                this.createItem('learn 3 new HTML tags')
            ],
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
            });
        }

        this.toggleProperty = (array, id, propName) => {
            const indexChanged = array.findIndex((elem) => elem.id === id);
            const oldItem = array[indexChanged];
            const newItem = {
                ...oldItem,
                [propName]: !oldItem[propName]
            };
            return [
                ...array.slice(0, indexChanged),
                newItem,
                ...array.slice(indexChanged + 1)
            ];
        }

        this.onToggleDone = (id) => {
            this.setState(({listData}) => {
                return {
                    listData: this.toggleProperty(listData, id, 'done')
                }
            });
        };

        this.onToggleImportant = (id) => {
            this.setState(({listData}) => {
                return {
                    listData: this.toggleProperty(listData, id, 'important')
                }
            });
        };

        this.matchSearch = (array, searchContent) => {
            const newArr = [];
            for (let i = 0; i < array.length; i++) {
                const oldItem = array[i];
                const newItem = {
                    ...oldItem,
                    searchVisibility: oldItem.content.toLowerCase().includes(searchContent)
                }
                newArr.push(newItem);
            }
            return newArr;
        }

        this.onToggleSearch = (event) => {
            const searchContent = event.target.value.toLowerCase();

            this.setState(({listData}) => {
                const newArray = this.matchSearch(listData, searchContent);

                return {
                    listData: newArray
                }
            });
        }

        this.onFilterDone = () => {
            this.setState(({listData}) => {
                const newArray = [];
                for (let i = 0; i < listData.length; i++) {
                    const oldItem = listData[i];
                    const newItem = {
                        ...oldItem
                    }
                    newItem.filterVisibility = newItem.done;
                    newArray.push(newItem);
                }

                return {
                    listData: newArray
                }
            });

        }

        this.onFilterActive = () => {
            this.setState(({listData}) => {
                const newArray = [];
                for (let i = 0; i < listData.length; i++) {
                    const oldItem = listData[i];
                    const newItem = {
                        ...oldItem
                    }
                    newItem.filterVisibility = !newItem.done;
                    newArray.push(newItem);
                }

                return {
                    listData: newArray
                }
            });
        }

        this.onFilterAll = () => {
            this.setState(({listData}) => {
                const newArray = [];
                for (let i = 0; i < listData.length; i++) {
                    const oldItem = listData[i];
                    const newItem = {
                        ...oldItem
                    }
                    newItem.filterVisibility = true;
                    newArray.push(newItem);
                }

                return {
                    listData: newArray
                }
            });
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
            });
        }
    };

    render() {
        const {listData} = this.state;
        const doneCount = listData.filter((el) => el.done).length;
        const todoCount = listData.length - doneCount;

        return (
            <div className="todo-app">
                <Header toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onToggleSearch={this.onToggleSearch}
                    />
                    <ItemStatusFilter
                        onFilterDone={this.onFilterDone}
                        onFilterActive={this.onFilterActive}
                        onFilterAll={this.onFilterAll}
                    />
                </div>
                <List things={listData}
                      onDeleted={this.deleteItem}
                      onToggleImportant={this.onToggleImportant}
                      onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
}