import React, { useState, useEffect } from "react"
import Header from "./Header"
import InputTodo from "./InputTodo"
import TodosList from "./TodosList"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Navbar from "./Navbar";
import {CONSTANTS} from '../../constants'


export default function TodoContainer(){
    const [todos, setTodos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [mode,setMode] = useState("add")
    const [taskId, setTaskId] = useState(0);
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskStartDate, setTaskStartDate] = useState((new Date()).toISOString().split('T')[0])
    const [taskPriority, setTaskPriority] = useState("")
    const [taskStatus, setTaskStatus] = useState("")
    const [status, setStatus] = useState(false)
    const [variant, setVariant] = useState("error")
    const [message, setMessage] = useState("")
    const [currentUser, setCurrentUser] = useState("")

    const onInputChange = (e)=>{
        switch(e.target.id){
            case "title":
                setTaskTitle(e.target.value)
                break;
            case "description":
                setTaskDescription(e.target.value)
                break;
            case "start_date":
                setTaskStartDate(e.target.value)
                break;
            case "priority":
                setTaskPriority(e.target.value)
                break;
            case "status":
                setTaskStatus(e.target.value)
                break;
            default:
                console.log('error')
        }
    }
    const delTodo = async id => {
        const response = await fetch(`${CONSTANTS.task_url}/delete?`+ new URLSearchParams({
            id : id,
            user_id: currentUser
        }),{
            method : "delete",

        })
        const data = await response.json()
        if(data.status){
            alert("Task successfully deleted")
            await getTasks()
        }
        else{
            alert("Could not fetch data")
        }
    }

    const viewTodo = async id =>{
        setMode("view")
        const response = await fetch(`${CONSTANTS.task_url}/get?`+ new URLSearchParams({
            id : id,
            user_id : currentUser
        }),{
            method : "get",

        })
        const data = await response.json()
        if(data.status){
            const task = data.data[0]
            setTaskTitle(task.task_title)
            setTaskDescription(task.task_description)
            setTaskStartDate(task.task_start_date.split("T")[0])
            setTaskPriority(task.task_priority)
            setTaskStatus(task.task_status)
            setModalOpen(true)
        }
        else{
            alert("Could not fetch data")
        }
        
    }

    const editTodo = async id=>{
        setMode("edit")
        const response = await fetch(`${CONSTANTS.task_url}/get?`+ new URLSearchParams({
            id : id,
            user_id : currentUser
        }),{
            method : "get",

        })
        const data = await response.json()
        if(data.status){
            const task = data.data[0]
            setTaskId(task.task_id)
            setTaskTitle(task.task_title)
            setTaskDescription(task.task_description)
            setTaskStartDate(task.task_start_date.split("T")[0])
            setTaskPriority(task.task_priority)
            setTaskStatus(task.task_status)
        }
        else{
            alert("Could not fetch data")
        }
        setModalOpen(true)
    }
    const addTodoItem = () => {
        console.log('works')
        setMode("add");
        setModalOpen(true)
    }

    const handleClose = ()=>{
        console.log('close')
        setTaskId("")
        setTaskTitle("")
        setTaskDescription("")
        setTaskStartDate((new Date()).toISOString().split('T')[0])
        setTaskPriority("")
        setTaskStatus("")
        setModalOpen(false)
    }
    const setUpdate = (updatedTitle, id) => {
        setTodos(
        todos.map(todo => {
            if (todo.id === id) {
            todo.title = updatedTitle
            }
            return todo
        })
        )
    }

    async function getTasks() {
        let user = localStorage.getItem("current_user") ? parseInt(localStorage.getItem("current_user")) : -1
        const response = await fetch(`${CONSTANTS.task_url}/get/?`+new URLSearchParams({user_id : user}),{
            method : "get"
        })
        const data = await response.json()
        if(data.status){
            setTodos(data.data)
        }
        else{
            alert("Could not fetch data")
        }
    }

    const handleSubmit = async ()=>{
        if(taskTitle === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Task title is a required field")
            return
        }
        if(taskStartDate === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Task start date is a required field")
            return
        }
        if(taskPriority === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Priority is a required field")
            return
        }
        console.log("status"+taskStatus,taskStatus === "")
        if(taskStatus === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Task status is a required field")
            return
        }

        const taskObject = {
            task_title : taskTitle,
            task_description: taskDescription,
            task_start_date: taskStartDate,
            task_status : taskStatus,
            task_priority: taskPriority,
        }

        if(mode === "add"){
            const response = await fetch(`${CONSTANTS.task_url}/create?`+new URLSearchParams({
                user_id : currentUser
            }),{
                method : "post",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify({task : taskObject})
            })
            const data = await response.json()
            if(data.status){
                handleClose()
                alert("Task was added successfully")
                await getTasks();
            }
            else{
                console.log(data.error)
            }
        }
        else if(mode === "edit"){
            const response = await fetch(`${CONSTANTS.task_url}/update?`+ new URLSearchParams({
                id: taskId,
                user_id : currentUser
            }),{
                method : "post",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify({task : taskObject})
            })
            const data = await response.json()
            if(data.status){
                handleClose()
                alert("Task was updated successfully")
                await getTasks();
            }
            else{
                console.log(data.error)
            }
        }
    }
    const handleAlertClose = function (){
        setStatus(false)
        setVariant("")
        setMessage("")
    }
    useEffect(()=>{
        if(localStorage.getItem("current_user")){
            setCurrentUser(parseInt(localStorage.getItem("current_user")))
        }
        else{
            console.log('not logged in')
        }
        async function fetchData(){
            await getTasks()
            console.log(todos)
        }
        fetchData()
    },[])

    return <div className="container">
        <Navbar/>
        {/* //<AddUpdateModal open={modalOpen}></AddUpdateModal> */}
        <div className="inner">
            <Header />
            <InputTodo addTodoProps={addTodoItem} />
            <TodosList todos={todos} deleteTodoProps={delTodo} viewTodoProps={viewTodo} editTodoProps={editTodo}setUpdate={setUpdate}/>
        </div>
        <Modal show={modalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row text-center">
                    {mode !== "view" ? <p className="text-muted"><span className="text-danger fw-bold">*</span> marked fields are mandatory</p> : <></>}
                </div>
                <div className="row">
                    <div className="form p-3">
                        <div className="row mb-3">
                            <label htmlFor="title" className="form-label p-0">Task Title <span className="text-danger fw-bold">*</span></label>
                            <input type="text" id="title" name="title" value={taskTitle} placeholder="Good Morning" className="form-control" disabled={mode !== "add"} onChange={onInputChange}/>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="description" className="form-label p-0">Task Description</label>
                            <textarea id="description" rows={5} name="description" value={taskDescription} placeholder="Add task details here" className="form-control" disabled={mode === "view"} onChange={onInputChange}></textarea>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="start_date" className="form-label p-0">Task Start Date <span className="text-danger fw-bold">*</span></label>
                            <input type="date" id="start_date" name="start_date" value={taskStartDate} className="form-control" disabled={mode === "view"} onChange={onInputChange}/>
                        </div>
                        <div className="row mb-3 d-flex justify-content-between">
                            <div className="col-md-5 p-0 me-3">
                                <label htmlFor="title" className="form-label">Task Priority <span className="text-danger fw-bold">*</span></label>
                                <select className="form-control" value={taskPriority} name="priority" id="priority" disabled={mode === "view"} onChange={onInputChange}>
                                    <option value="">Select Priority</option>
                                    <option value={3}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={1}>Low</option>
                                </select>
                            </div>
                            <div className="col-md-6 p-0">
                                <label htmlFor="title" className="form-label">Task Status <span className="text-danger fw-bold">*</span></label>
                                <select className="form-control" name="status" id="status"  value={taskStatus} disabled={mode === "view"} onChange={onInputChange}>
                                    <option value="">Select Status</option>
                                    <option value={0}>Not Completed</option>
                                    <option value={1}>Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert key={variant} variant={variant} show={status} dismissible onClose={handleAlertClose}>
                    {message}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                {mode !== "view" ? (<><Button variant="secondary" onClick={handleClose}>Close</Button><Button variant="primary" onClick={handleSubmit}>Save Changes</Button> </>): <></>}
            </Modal.Footer>
        </Modal>
    </div>
}