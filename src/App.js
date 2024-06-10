import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalState from "./globalState";
import Header from "./componentes/Header";
import Home from './pages/Home';
import BuildCreator from './pages/BuildCreator'
import BuildList from "./pages/BuildList";

function App() {  
return (
  <div className="GeneralFont">
    <Router>
    <GlobalState>
      <Header/>
      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/BuildCreator" element={<BuildCreator/>}></Route>
          <Route path="/BuildList" element={<BuildList/>}></Route>
          {/* <Route path="/VotacionesPorJugador" element={<VotacionesPorJugador/>}></Route>
          <Route path="/VotacionesPorSemana" element={<VotacionesPorSemana/>}></Route>
          <Route path="/ListadoLideres" element={<ListadoLideres/>}></Route>
          <Route path="/ListadoEliminados" element={<ListadoEliminados/>}></Route>
          <Route path="/PlacasPorSemana" element={<PlacasPorSemana/>}></Route>
          <Route path="/PlacasEnContinuado" element={<PlacasEnContinuado/>}></Route>
          <Route path="/GraficosNominaciones" element={<GraficosNominaciones/>}></Route> */}
        </Routes>
        </GlobalState>
    </Router>
  </div>
);
}  
export default App;