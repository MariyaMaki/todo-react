import React, { useState, useRef, useEffect } from "react"; //hooks useState: modifier le statut, useRef: sert à référencer, useEffect: local storage
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]); //todos = all the todos we have in the todos state, setTodos function to update de todos
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []); // nous rendre ce que nous avons stocké

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); // save every time there is a change

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  } // pouvoir checker la checkbox quand c'est complete or incomplete

  function handleAddTodo(e) {
    const name = todoNameRef.current.value; // element currently referencing
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div className="App">
        <h1>To Do List</h1>

        <input className="addToDo" ref={todoNameRef} type="text" />

        <div className="buttons">
          <button className="add_btn" onClick={handleAddTodo}>
            Add Todo
          </button>

          <button className="clear_btn" onClick={handleClearTodos}>
            Clear Completed Todos
          </button>
        </div>

        <div className="list">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>

        <div className="leftToDo">
          {todos.filter((todo) => !todo.complete).length} left to do
        </div>
      </div>
    </>
  );
}

export default App;
