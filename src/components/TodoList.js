import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

export const todoUrl = "https://jsonplaceholder.typicode.com/todos";
export const userUrl = "https://jsonplaceholder.typicode.com/users";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => retrieveTodos(), []);

  const retrieveTodos =  async () => {
    const todos = await axios.get(todoUrl)
                                    .then((res) => res.data)
                                    .catch((res) => console.log(res.status));
    const users = await axios.get(userUrl)
                                    .then((res)=> res.data);

    const todoResponse = await axios.get(todoUrl)
                                  .then((res)=>res.status);
    console.log(todoResponse);
    
    if (todoResponse.status === 404) {
      setHasError(true);
      return;
    }

     

  
    todos.forEach((todo) => {
      const user = users.find((user) => user.id === todo.userId);
      todo.user = user;
    });

    setTodos(todos);
  };

  return (
    <div>
      {hasError ? <div>Opps come back later</div> : null}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Todo</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td> {todo.user.name}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? <span>&#10004;</span> : ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
