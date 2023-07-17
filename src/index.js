import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContextProvider } from './context/UserContext';
import Login from "./components/login"
import Register from './components/register';
import GameHome from './components/GameHome';
import FavoritesScreen from './components/favoritesScreen/FavoritesScreen';


const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login/>,
  },
  {
    path: "/auth/register",
    element: <Register/>,
  },
  {
    path: "/favorites",
    element: <FavoritesScreen/>,
  },
  {
    path: "/",
    element: <GameHome/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
