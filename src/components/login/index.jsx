import { Link } from "react-router-dom"
import React, { useContext, useState } from "react";
import "./styles.css"
import UserContext from "../../context/UserContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Login = () =>{
    const userContext = useContext(UserContext) 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState();
    const auth = getAuth();


    const logUser = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error){
            setErr(error)
        }
    }

    const shouldHideError = () => {
        if (err) {
            return false
        }
        return true

  }

    const getErrorMessage = () => {
        if(err?.code === "auth/invalid-email"){
            return "Email inválido"
        }
        if (err?.code === "auth/wrong-password") {
            return "Senha incorreta"
        }
        if (err?.code === "auth/user-not-found") {
            return "Usuário não encontrado"
        }
        return "Erro ao fazer login. Tente novamente mais tarde!"
    }

    if (userContext.user) {
        console.log(userContext.user)
        return <Navigate to="/"/>
    }

    return (
        <>
        <form onSubmit={logUser}>
            <div className="background-login">
                <div className="container-login">
                <div className='welcome'>LOGIN</div>
                <div className="alert-mensage" hidden={shouldHideError()} role="alert">
                            {getErrorMessage()}
                </div> 
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
                <div className="login-button-div"><button className="login-button" type="submit">Login</button></div>
                <div className="create-account"><p>Don't have an account? </p><Link to="/auth/register" style={{textDecoration: "none", color: "white", fontWeight: "500"}}>Create Account</Link></div>
                </div>
            </div>
        </form>
        </>
    )
}

export default Login