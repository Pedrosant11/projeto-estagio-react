import React, { Children, useContext } from "react";
import UserContext from "./context/UserContext";
import { Navigate } from "react-router-dom";
import GameHome from "./components/GameHome";
import "./App.css"
import { useEffect } from "react";
import { getAuth } from "firebase/auth";


function App({ children }) {

  const userContext = useContext(UserContext) 

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      console.log(user)
      if (user) {
        userContext.setUser(user)
      } else {
        userContext.setUser()
      }
    });
  }, [])

  return children;
}

export default App;