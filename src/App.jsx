import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import MainLayout from "./layout/MainLayout"
import Dashboard from "./pages/ControlPanel/ControlPanel"
import Orders from "./pages/Orders/Orders"
import Inventory from "./pages/Inventory/Inventory"
import Delivery from "./pages/Delivery/Delivery"
import Chats from "./pages/Chats/Chats"
import './App.css'
import { useEffect } from "react"
import Login from "./pages/Auth/Login/Login"
import SignUp from "./pages/Auth/SignUp/SignUp"
import EnsureLogin from "./pages/Auth/EnsureLogin/EnsureLogin"
import DataPharmacy from "./pages/Auth/DataPharmacy/DataPharmacy"
import SuccessVerification from "./pages/Auth/SuccessVerification/SuccessVerification"

function App(){
    const getProducts = async () => {
        try {
          const response = await axios.get("https://mediaid-backend-v2.onrender.com/api/products");
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
      
      useEffect(() => {
        getProducts();
      }, []);

    return(
        <BrowserRouter>
            <Routes>
                {/* Auth Pages without Sidebar */}
               

                {/* Dashboard Pages with Sidebar */}
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    
                    <Route path="orders" element={<Orders/>}/>
                    <Route path="inventory" element={<Inventory/>}/>
                    <Route path="delivery" element={<Delivery/>}/>
                    <Route path="chats" element={<Chats/>}/>
                    <Route path="data-pharmacy" element={<DataPharmacy/>}/>
                    <Route path="/ensure-login" element={<EnsureLogin/>}/>
                    <Route path="/success-verification" element={<SuccessVerification/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
