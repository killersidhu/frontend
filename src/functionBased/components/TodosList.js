import React from "react"
import TodoItem from "./TodoItem"

const TodosList = props => {
  return (
    <ul>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.task_id}
          todo={todo}
          deleteTodoProps={props.deleteTodoProps}
          viewTodoProps={props.viewTodoProps}
          editTodoProps={props.editTodoProps}
          setUpdate={props.setUpdate}
        />
      ))}
    </ul>
  )
}
export default TodosList;