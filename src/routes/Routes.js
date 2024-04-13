import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import App from "../App";
import AddUser from "../pages/user/AddUser";
import EditUser from "../pages/user/EditUser";

const Routers = () => {

    return (

        <Routes>
             <Route path="/" element={<App />}></Route>
             <Route path="/home" element={<Home />}></Route>
             <Route path="/add-user" element={<AddUser />}></Route>
             <Route path="/edit-user/:id" element={<EditUser />}></Route>

        </Routes>
    )
}

export default Routers;