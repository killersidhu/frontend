import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {useNavigate} from 'react-router-dom';
import { CONSTANTS } from '../../constants'


export default function Login(props){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [variant, setVariant] = useState("")
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleAlertClose = ()=>{
        setMessage("")
        setVariant("")
        setStatus(false)
    }
    const onInputChange = (e)=>{
        const name = e.target.name
        handleAlertClose()
        switch(name){
            case "username":
                setUserName(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            default:
                console.log("error")
        }
    }
    const handleLogin = async ()=>{
        if(userName === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Please enter username to continue")
            return
        }
        if(password === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Please enter password to continue")
            return
        }
        const loginObject = {
            username : userName,
            password : password
        }

        const response = await fetch(`${CONSTANTS.auth_url}/login`,{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({creds : loginObject})
        })

        const data = await response.json()
        if(data.status){
            console.log(data)
            localStorage.setItem("current_user",data.user_id)
            navigate("/todo")
        }
        else{
            setStatus(true)
            setVariant("danger")
            setMessage(data.error)
        }

    }
    return <div>
        <div className='row d-flex justify-content-center'>
            <div className='col-lg-8 col-md-8 col-sm-12'>
                <div className='form m-3'>
                    <div class="row mb-1 text-center text-info">
                       <h3>Login</h3>
                    </div>
                    <div className='row mb-1'>
                        <Alert key={variant} variant={variant} show={status} dismissible onClose={handleAlertClose}>
                            {message}
                        </Alert>
                    </div>
                    <div class="row mb-2">
                        <label className='form-label p-0' htmlFor='username'>Username</label>
                        <input type="text" name="username" id="username" className='form-control' value={userName} placeholder="Enter Username" onChange={onInputChange}/>
                    </div>
                    <div class="row mb-2">
                        <label className='form-label p-0' htmlFor='password'>Password</label>
                        <input type="password" name="password" id="password" className='form-control' value={password} placeholder="Enter Password" onChange={onInputChange}/>
                    </div>
                    <div class="row mb-2 d-flex justify-content-center">
                        <div class="col-lg-2 col-md-3 col-sm-4">
                            <Button variant="primary" onClick={handleLogin} type="button">Login</Button>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
}
