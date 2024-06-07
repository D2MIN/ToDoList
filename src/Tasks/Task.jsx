import React, { useRef } from "react";
import style from "./TaskStyle.module.css"

export function Task(props){

    const id = useRef(props.id)

    return(
        <div>
            <div className={style.Task}>
                <div className={style.TaskText}>
                    <p>{props.text}</p>
                    <p className={style.time}>{props.time.slice(0,15)}</p>
                </div>
                <div className={style.DeleteTask}>
                    <button className={style.delete} onClick={() => props.deleteTask(id.current)}>✖</button>
                    <button className={style.comlete} onClick={() => props.deleteTask(id.current,'complete')}>✔</button>
                </div>
            </div>
        </div>
    );
}