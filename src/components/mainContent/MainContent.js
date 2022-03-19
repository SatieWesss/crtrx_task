import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import ItemDetails from '../itemDetails/ItemDetails';
import TodoList from '../todoList/TodoList';
import Context from '../../context';

import './main-content.css';

function MainContent(props) {
    const [todos, setTodos] = useState([]);
    
    return (
        <Context.Provider value={{todos, setTodos}}>
            <div className='main-content'>
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/todo-details/:id" element={<ItemDetails />} />
                </Routes>
            </div>
        </Context.Provider>
    );
}

export default MainContent;