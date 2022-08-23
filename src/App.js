import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import './App.css';
import {FormControl,Input, InputLabel } from '@mui/material';
import Todo from "./Todo.js";
import db from "./firebase" ;
import firebase from "firebase";

function App() {

  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState("");
  // console.log(input)
  // When the app loads we need to listen to the dtaabase and fetch new todos as the get added/removed

  useEffect(()=>{
    // this code here... fire when app.js loads
      db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      // console.log(snapshot.docs.map(doc=>doc.data()));
      setTodos(snapshot.docs.map(doc=>({id:doc.id, todo:doc.data().todo})))
    })
  }, []);

  const addTodo=(event)=>{
   
    // to prevent the refresh
    event.preventDefault();  

    // the input we enter will be stored in the database and will be printed
    db.collection('todos').add({
      todo: input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()

    })
    
    // setTodos([...todos,input]);
    
    setInput("") // to clear it after a submit 
  }

  return (
    <div className="App">
      <h1>Hello World</h1>

      <form>
        <FormControl>
      
          <InputLabel> ✅ Write a Todo</InputLabel>
          <Input type="text" value={input} onChange={event=>setInput(event.target.value)}/>
        </FormControl>

      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        To-Do
      </Button>

      {/* <button type="submit" onClick={addTodo}> Hello</button> */}
      </form>
      
      
      <ul>
        {todos.map(todo=>(
          <Todo todo={todo}/>
          // <li>{todo}</li>
        ))}
        
      </ul>
    </div>
  );
}

export default App;
