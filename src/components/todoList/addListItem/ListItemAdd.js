import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from 'moment'
import Context from '../../../context';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import './add-list-item.css';

function ListItemAdd(props) {
    const { todos, setTodos } = useContext(Context);

    const [dateValue, setDateValue] = useState(null);
    const [todoName, setTodoName] = useState("");
    const [dateName, setDateName] = useState("");

    const onNameChange = (event)=> {
        let name = event.target.value;
        setTodoName(name)
    };

    const onDateChange = value => {
        setDateValue(value);
        setDateName(moment(value).format("YYYY-MM-DD"))
    };

    const onTodoAdd = () => {
        if(!todoName || !dateValue) return;
        let alreadyHasTheDate = _.findIndex(todos, {"todoDateName": dateName})

        let todoItemData =  {
            title: todoName,
            done: false,
            editing: false,
            itemId: uuidv4()
        };

        if(alreadyHasTheDate == -1){
            let newItem = {
                uuid: uuidv4(),
                todoDate: dateValue,
                todoDateName:dateName,
                todoItems: [todoItemData]
            };
      
            setTodos(todos => {
                return (
                    [
                        ...todos,
                        newItem
                    ]
                )
            });
        }else {
            let newState = [...todos];
            let oldItem = newState[alreadyHasTheDate].todoItems;
            oldItem.push(todoItemData)
            setTodos(newState)
        }

        setTodoName("");
        setDateValue(null)
    };

    return (
        <Paper elevation={0} className="add-new-task">
            <Typography variant="h6">
                New Task
            </Typography>

            <div className='add-todo-form'>
                <TextField
                    id="outlined-basic"
                    label="Type here"
                    variant="outlined"
                    size="small"
                    value={todoName}
                    onChange={onNameChange}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={dateValue}
                        onChange={(newValue) => onDateChange(newValue)}
                        renderInput={(params) => <TextField {...params} size="small"/>}
                    />
                </LocalizationProvider>

                <Button variant="contained" onClick={onTodoAdd}>
                    Add
                </Button>
            </div>
        </Paper>
    );
}

export default ListItemAdd;