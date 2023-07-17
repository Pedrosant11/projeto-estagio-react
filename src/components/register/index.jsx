import React, {useState} from "react"
import { Link, Navigate } from "react-router-dom"
import "./styles.css"
import { updateProfile, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useContext} from "react";
import UserContext from "../../context/UserContext";

const Register = () =>{
    const userContext = useContext(UserContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [err, setErr] = useState();
    const auth = getAuth();


    const checkPasswords = () => {
        setPasswordMatch(password === confirmPassword)
    }

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            // userContext.setUser(userCredential.user)
        } catch (error) {
            console.log(error)
            setErr(error)
        }
    }

    const shouldHideError = () => {
        if(!passwordMatch){
            return false
        }
        if (err) {
            return false
        }
        return true
  }

    const getErrorMessage = () => {
        if(err?.code === "auth/email-already-exists"){
            return "Email já cadastrado"
        }
        if(!passwordMatch){
            return "Senhas não conferem"
        }

        return "Erro ao fazer cadastro. Tente novamente mais tarde!"
    }

    if (userContext.user) {
        return <Navigate to="/" />
    }
    return (
            <>
            <form onSubmit={registerUser}>
            <div className="background-register">
                <div className="container-login">
                <div className='welcome'>REGISTER</div>
                <div className="alert-mensage" hidden={shouldHideError()} role="alert">
                            {getErrorMessage()}
                </div> 
                <input
                    className="input-login-register" 
                    type="text" 
                    id="typeNameX" 
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name' 
                ></input>
                <input 
                    className="input-login-register" 
                    type="text" 
                    id="typeEmailX" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email' 
                ></input>
                <input 
                    className="input-login-register" 
                    type="password" 
                    id="typePasswordX" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' 
                ></input>
                <input 
                    className="input-login-register" 
                    type="password" 
                    id="typeConfirmPasswordX" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={checkPasswords}
                    placeholder='Confirm password' 
                ></input>
                <button className="register-button" type="submit">Create Account</button>
                <div>
                    <p className="have-account">Already have an account? <Link to="/auth/login" style={{textDecoration: "none", color: "white", fontWeight: "500"}}>Login</Link>
                    </p>
                </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default Register