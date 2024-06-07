import { useEffect, useRef, useState } from "react";
import style from "./ToDo.module.css";
import { CreateTask } from './CreateTask';
import {Task} from "./Task";
import { type } from "@testing-library/user-event/dist/type";
export function Tasks(){

    const nowDate  = useRef(localStorage.getItem('nowDate') == null? new Date() : localStorage.getItem('nowDate'));
    const month = useRef({
        'Jun' : 1,
        'Feb' : 2,
        'Mar' : 3,
        'Apr' : 4,
        'May' : 5,
        'Jun' : 6,
        'Jul' : 7,
        'Aug' : 8,
        'Sep' : 9,
        'Oct' : 10,
        'Nov' : 11,
        'Dec' : 12,
    }) 

    useEffect( ()=> {
        let date = new Date().toString();
        let monthNumber = month.current[`${date.slice(4,7)}`]
        let day = parseInt(date.slice(7,10),10);
        let year = parseInt(date.slice(11,15),10);
        let sumDay = day+year+ ( 31*(monthNumber-1)+1 );
        
        if( typeof(nowDate.current) == "object"){
            localStorage.setItem('nowDate', sumDay);
        }
        console.log( sumDay,nowDate.current );
        if(sumDay > nowDate.current){
            localStorage.setItem('nowDate', sumDay);
            setCountCompleteTasks(0);
            localStorage.setItem('countCompleteTasks', 0);
        }
    }, [])

    const [tasks, setTasks] = useState( localStorage.getItem('Tasks') == null ? [] : JSON.parse(localStorage.getItem('Tasks')).current );
    const storageTasks = useRef(localStorage.getItem('Tasks') == null ? [] : JSON.parse(localStorage.getItem('Tasks')).current );

    const [countCompleteTasks, setCountCompleteTasks] = useState(localStorage.getItem('countCompleteTasks') == null ? 0 : parseInt(localStorage.getItem('countCompleteTasks')));
    const storageCountCompleteTasks = useRef(localStorage.getItem('countCompleteTasks') == null ? 0 : parseInt(localStorage.getItem('countCompleteTasks')))

    const id = useRef( localStorage.getItem('TaskID') == null ? 0 : parseInt(localStorage.getItem('TaskID')) );

    function createTask(text){
        let date = new Date();
        let time = date.toString()

        console.log(id.current);
        id.current = id.current + 1;
        localStorage.setItem('TaskID', id.current);

        const newTask = { id : id.current, text : text, time : time};
        setTasks(tasks.concat(newTask));
        storageTasks.current = storageTasks.current.concat( { id : id.current, text : text, time : time} )
        localStorage.setItem('Tasks', JSON.stringify(storageTasks) );
    }
    
    function deleteTask(taskId, action = 'delete'){
        if(action == 'complete'){
            setCountCompleteTasks(countCompleteTasks + 1);
            storageCountCompleteTasks.current = storageCountCompleteTasks.current + 1;
            localStorage.setItem('countCompleteTasks', storageCountCompleteTasks.current);
        }

        for(let comp in tasks){
            if(tasks[comp].id == taskId){
                setTasks( tasks.filter(task => task.id != taskId) );
            }
        }

        for(let task of storageTasks.current){
            if(task.id == taskId){
                storageTasks.current = storageTasks.current.filter(task => task.id != taskId);
            }
        }

        localStorage.setItem('Tasks', JSON.stringify(storageTasks));
    }
    
    return(
        <div className={style.ToDo}>
            <CreateTask createTask = {createTask}/>
            <div>
                <h3>Выполненныз задач сегодня : {countCompleteTasks}</h3>
            </div>
            {tasks.map(task => (
                <Task deleteTask = {deleteTask} id={task.id} key={task.id} text={task.text} time={task.time} />
            ))}
        </div>
    );
}