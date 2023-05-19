import React from "react";
import { BrowserRouter, Routes as RoutesDom, Route } from "react-router-dom";

import Login from "./pages/Login";
import Users from "./pages/Users";
import Menu from "./components/Menu";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import FirstAccess from "./pages/FirstAccess";
import Notifications from "./pages/Notifications";
import ForgotPassword from "./pages/ForgotPassword";
import Assistente from "./pages/Assistente";
import NovaConsulta from "./pages/NovaConsulta";
import Procedimentos from "./pages/Procedimentos";
import Maps from "./pages/Maps";

export default function Routes() {
  return(
    <BrowserRouter>
      <Menu hideRoutes={["/", "/nova-senha", "/primeiro-acesso"]}/>

      <RoutesDom>
        <Route path="/" element={<Login />} />
        <Route path="/produtos-cadastrados/:filterType?/:filter?" element={<Products />} />        
        <Route path="/notificacoes" element={<Notifications />} />        
        <Route path="/Dashboard" element={<Dashboard />} />        
        <Route path="/nova-senha" element={<ForgotPassword />} />        
        <Route path="/primeiro-acesso" element={<FirstAccess />} />
        <Route path="/usuarios" element={<Users />} />                
        <Route path="/assistente-virtual" element={<Assistente />} /> 
        <Route path="/NovaConsulta" element={<NovaConsulta />} />        
        <Route path="/Procedimentos" element={<Procedimentos />} />        
        <Route path="/Maps" element={<Maps />} />        


      </RoutesDom>
    </BrowserRouter>
  )
}