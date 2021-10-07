import React, { useContext, useRef, useState } from 'react';
import { TodoContext } from './TodoContext';
import { TodoListTask } from './TodoListTask';

export const TodoListItem = ( { currentTodo } )=>{

  const { dispatch, state: { todo } } = useContext(TodoContext);
  const item = todo.item;
  const formRef = useRef(null);
  const [state, setState] = useState(item);

  const onAddTask = (e) => {
    e.preventDefault();
    console.log(state);
    const task = {
      id: new Date().getTime(),
      name: state.name,
      completed: false,
      idTodo: state.id
    };
      dispatch({ type: "add-task", item: task });
      setState( { name: "" } );
      formRef.current.reset();
  }

  const onDeleteToDo = (todo) => { 
    dispatch({ type: "delete-todo", id: todo.id })
  };

  return (
    <li key={ currentTodo.id } className="list-group-item">
    <h2>{currentTodo.name}</h2>
    <button onClick={() => onDeleteToDo(currentTodo)} className="btn btn-danger ms-2 mb-2">Eliminar lista</button>
    <form ref={formRef} className="d-flex mb-2">
      <input
        className="form-control me-2"
        type="text"
        name="name"
        placeholder="¿Qué piensas hacer hoy?"
        defaultValue={(item.idTodo===currentTodo.id) ? item.name : ''}
        onChange={(event) => {
          setState({ ...state, name: event.target.value, id: currentTodo.id })
        }}>
      </input>
      {!item.id && <button className="btn btn-success" onClick={onAddTask}>Crear</button>}
    </form>
    <TodoListTask 
        currentTodo={currentTodo}
      />
    <hr/>
    </li>
  )
}