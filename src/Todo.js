import { List, ListItem, ListItemText,ListItemAvatar,Modal} from '@mui/material';
import React, { useState } from 'react';
import db from './firebase';
import './Todo.css';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';



const useStyles=makeStyles((theme)=>({
    paper:{
        position:'absolute',
        width:600,
        backgroundColor: theme.palette.background.paper,
        border:"2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
    button:{
        width:150,
        margin:"10px"
    },
}));

 function Todo(props){
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [input, setInput]=useState();

    const handleOpen=()=>{
        setOpen(true);
    };

    const updateTodo=()=>{
        
        db.collection("todos").doc(props.todo.id).set({
            todo:input,
        },{merge:true});
        setOpen(false);
    }
    return (
        <>
        <Modal
            open={open}
            onClose={(e) => setOpen(false)}>

            <div className={classes.paper}>
                <h1>Update the Task</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event=>setInput(event.target.value)}/>
                <Button onClick={updateTodo}> Update Todo</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemAvatar>
                
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Deadline ⏰"/>
            </ListItem>
            <EditIcon onClick={e=>setOpen(true)}/>
            <DeleteForeverIcon onClick={event=>db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        </>
    )
 }

 export default Todo