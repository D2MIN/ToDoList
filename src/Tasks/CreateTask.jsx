import { useState } from "react";
import style from "./CreateTask.module.css"

export function CreateTask(props){

    const [taskText, setTaskText] = useState("");

    function setText(event){
        setTaskText(event.target.value );
    }

    function addTask(){
        if(taskText != ""){
            props.createTask(taskText);
            setTaskText("");
        }
    }

    function EnterTask(event){
        if(event.key == "Enter"){
            if(taskText){
                props.createTask(taskText);
                setTaskText("");
            }
        }
    }

    return(
        <div className={style.createTaskSection}>
            <h1>ToDoList</h1>
            <div className={style.createTask}>
                <input onKeyUp={EnterTask} onChange={setText} type="text" placeholder="Добавить задачу" value={taskText}/>
                <button onClick={addTask}></button>
            </div>
        </div>
    );
}