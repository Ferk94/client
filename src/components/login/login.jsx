import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from '../../redux/actions/userActions';
import { Redirect } from 'react-router-dom';
import "./login.css";
import { Button } from 'reactstrap';


const initialState = {
    email: '',
    password: ''
}


export default function LogIn() {
    const [input, setInput] = useState(initialState);
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(initialState);
    const [photos, setPhotos] = useState(1)
    const dispatch = useDispatch();


    useEffect(() => {
        setTimeout(() => {  
            if(photos<7){
             setPhotos(photos + 1);   
            } else {
                setPhotos(1)
            }   
         }, 6000);
     },[photos]);

    function handleInputChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    const validateInput = function (e) {
        let { name } = e.target;

        if (name === "email") {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
            setError({ ...error, [name]: "Mail incorrecto" });
          } else {
            setError({ ...error, [name]: "" });
          }
        }
        if (name === "password") {
          if (e.target.value.length < 6) {
            setError({ ...error, [name]: "Minimo seis caracteres" });
          } else {
            setError({ ...error, [name]: "" });
          }
        }
       
      };


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(logIn(input.email, input.password));
        setRedirect(true)
        setInput(initialState)
    }



    if (redirect === false) {

        return <div className={"landing" + 4}>
            <Link to='/'>
            <img className="landingLogo" src="../images/LogoBlanco.png" alt="logoBlancologin"/></Link>
                <form onSubmit={(e) => handleSubmit(e)} className="loginContainer">
                    <div className="loginForm">
                    <img className="loginLogo" src="../images/Logo.png" alt="logoBlancologin"/>
                    {/* <img className="loginPie" src="../images/FraseLogin.png" alt="loginFrase"/> */}
                    <div className="loginWelcome">Te damos la bienvenida a tu QBOOK</div>
                    <div className="textform"> </div>
                    <input name="email" placeholder="email" id="email" onChange={(e) => {
                        handleInputChange(e)
                        validateInput(e)}}>
                        </input>
                        <br/>
                        <div className="errorLogin">{error?.email}</div>
                    <div className="textformPass"> </div>
                    <input name="password" placeholder="contraseña" type="password" id="password" onChange={(e) => {
                            handleInputChange(e)
                            validateInput(e)}}>
                        </input>
                        <br/>
                        <div className="errorLogin">{error?.password}</div>
                    <Button type='submit' className="buttonLoginLogin">iniciar sesion</Button>  
                    </div>
                </form>
                <div className="whatsappContainerLogin">
            <a href="https://wa.me/message/UW5MARGNVV24M1" target="_blank" rel="noreferrer">
            <img className="whatsappLanding" src="./images/WhatsappIcon.png" alt=""/>
            </a>
        </div>
        </div>
    } else {
        return <Redirect to="/auth" />
    }


}
