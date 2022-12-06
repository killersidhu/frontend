import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { CONSTANTS } from '../../constants'
import md5 from 'md5'


export default function Register(props){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [variant, setVariant] = useState("")
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState("")

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
            case "re-password":
                setRePassword(e.target.value)
                break
            default:
                console.log("error")
        }
    }
    const handleRegister = async ()=>{
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
        if(rePassword === ""){
            setStatus(true)
            setVariant("danger")
            setMessage("Please re-enter password to continue")
            return
        }
        if(password !== rePassword){
            setStatus(true)
            setVariant("danger")
            setMessage("Password and duplicate password must match")
            return
        }
        const loginObject = {
            username : userName,
            password : password
        }

        const response = await fetch(`${CONSTANTS.auth_url}/register`,{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({creds : loginObject})
        })

        const data = await response.json()
        if(data.status){
            setStatus(true)
            setVariant("success")
            setMessage("You have successfully registered. You can login now!")
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
                       <h3>Register</h3>
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
                    <div class="row mb-2">
                        <label className='form-label p-0' htmlFor='password'>Re-enter Password</label>
                        <input type="password" name="re-password" id="re-password" className='form-control' value={rePassword} placeholder="Verify Password" onChange={onInputChange}/>
                    </div>
                    <div class="row mb-2 d-flex justify-content-center">
                        <div class="col-lg-3 col-md-3 col-sm-4">
                            <Button variant="primary" onClick={handleRegister} type="button">Register</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
