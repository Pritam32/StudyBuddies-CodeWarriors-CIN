
import React from "react";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import '../assets/css/todo.css';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase2";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';

const Todo=()=>{
  const [todos, setTodos] = React.useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div>
    <nav className="navbar navbar-light navbar-expand-lg">
        <div className="container d-flex flex-row">
          <a className="navbar-brand" href="#">StudyBuddies</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav m-auto my-2 my-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active" href="/classes">StudyRoom</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/todos">Study Goals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/whiteboard" >
                  Whiteboard
                </a>
               
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ide">Code Editor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/files">Files</a>
              </li>
              {isAuthenticated?<LogoutButton/>:null}
            </ul>
           
          </div>
        </div>
      </nav>
    <div className="container-fluid " style={{display:"flex",flexDirection:'column',alignItems:'center',background:'linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )',height:'100vh'}}>
      
      
      
      <h1 className="mt-5">TODO List</h1>
     
    
      
      <div>
        <AddTodo />
      </div>
      <div className="todo_container ">
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
export default Todo;