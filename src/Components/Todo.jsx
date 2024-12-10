import React, { useState, useRef, useEffect } from 'react';
import Todoitems from './Todoitems';
import todoIcon from "../assets/todo_icon.png";

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggle = (id) => {
        setTodoList((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        console.log(todoList);
    }, [todoList]);

    return (
        <div className='flex flex-col bg-white w-11/12 rounded-xl max-w-md min-h-[550px] place-self-center'>
            {/* -----title----- */}
            <div className='flex items-center mt-7 pl-4 gap-2'>
                <img className='w-8' src={todoIcon} alt="Todo Icon" />
                <h1 className='font-semibold text-3xl'>To-Do List</h1>
            </div>

            {/* -----input box----- */}
            <div className='flex items-center mt-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pr-2 pl-6 placeholder:text-slate-600' type="text" placeholder='Add Your Task' />
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD+</button>
            </div>

            {/* -----todo list----- */}
            <div>
                {todoList.map((item) => (
                    <Todoitems
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
