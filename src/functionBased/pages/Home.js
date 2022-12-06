import React, { useState } from "react";
import Header from "../components/Header";
import Modal from 'react-bootstrap/Modal'
import Login from './Login'
import Register from './Register'
import styles from "./Home.module.css"
export default function Home(props){
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    const openRegisterModal = ()=>{
        setRegisterModal(true)
    }

    const closeRegisterModal = ()=>{
        setRegisterModal(false)
    }

    const openLoginModal = ()=>{
        setLoginModal(true)
    }

    const closeLoginModal = ()=>{
        setLoginModal(false)
    }
    return <div className="d-flex justify-content-center align-items-center background">
        <div class="col-md-6">
            <div class="row">
                <Header color="#7e93cc"></Header>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-8 text-center">
                    <button className="m-3 home-button btn-outline-primary" onClick={openLoginModal}>Login to start!!</button>
                    <button className="m-3 home-button btn-outline-dark" onClick={openRegisterModal}>Register</button>
                </div>
            </div>
        </div>
        <Modal show={registerModal} onHide={closeRegisterModal}>
            <Register handleClose={closeRegisterModal}/>
        </Modal>

        <Modal show={loginModal} onHide={closeLoginModal}>
            <Login handleClose={closeLoginModal}/>
        </Modal>
    </div>
}