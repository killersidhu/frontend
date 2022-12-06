import React, { useState } from "react"
import styles from "./TodoItem.module.css"
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';

const TodoItem = props => {
  const [editing, setEditing] = useState(false)

  const handleEditing = () => {
    setEditing(true)
  }

  const handleUpdatedDone = event => {
    if (event.key === "Enter") {
      setEditing(false)
    }
  }

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  }

  const { task_status, task_id, task_title, task_priority } = props.todo
  let viewMode = {}
  let editMode = {}

  if (editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  const selectBackgroundClass  = (task_priority)=>{
    if(task_priority === 3){
      return "bg-warning text-dark"
    }
    if(task_priority === 2){
      return "bg-primary text-light"
    }
    if(task_priority === 1){
      return "bg-secondary text-light"
    }
  }
  return (
    <li className={styles.item+ " "+selectBackgroundClass(task_priority) }  >
      <div style={viewMode}>
        <button onClick={() => props.deleteTodoProps(task_id)} className="me-1">
            <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <button onClick={() => props.editTodoProps(task_id)} className="me-1">
            <FaEdit style={{ color: "blue", fontSize: "16px" }} />
        </button>
        <button onClick={() => props.viewTodoProps(task_id)} className="me-1">
            <FaEye style={{ color: "green", fontSize: "16px" }} />
        </button>
        
        
        <span style={task_status === 1 ? completedStyle : null}>{task_title}</span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={task_title}
        onChange={e => {
          props.setUpdate(e.target.value, task_id)
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  )
}

export default TodoItem;