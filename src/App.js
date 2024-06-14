import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalState from "./globalState";
import Header from "./componentes/Header";
import Home from './pages/Home';
import BuildCreator from './pages/BuildCreator'
import BuildDelete from "./pages/BuildDelete";
import BuildBrowser from "./pages/BuildBrowser";
import { BsChevronUp } from "react-icons/bs";

function App() {  

  $(document).ready(function(){

    $('.ir-arriba').click(function(){
      $('body, html').animate({
        scrollTop: '0px'
      }, 300);
    });

    $(window).scroll(function(){
      if( $(this).scrollTop() > 0 ){
        $('.ir-arriba').slideDown(300);
      } else {
        $('.ir-arriba').slideUp(300);
      }
    });

  });

  return (
  <div className="GeneralFont">
    <Router>
    <GlobalState>
      <Header/>
      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/BuildCreator" element={<BuildCreator/>}></Route>
          <Route path="/BuildDelete" element={<BuildDelete/>}></Route>
          <Route path="/BuildBrowser" element={<BuildBrowser/>}></Route>
          {/* <Route path="/VotacionesPorJugador" element={<VotacionesPorJugador/>}></Route>
          <Route path="/VotacionesPorSemana" element={<VotacionesPorSemana/>}></Route>
          <Route path="/ListadoLideres" element={<ListadoLideres/>}></Route>
          <Route path="/ListadoEliminados" element={<ListadoEliminados/>}></Route>
          <Route path="/PlacasPorSemana" element={<PlacasPorSemana/>}></Route>
          <Route path="/PlacasEnContinuado" element={<PlacasEnContinuado/>}></Route>
          <Route path="/GraficosNominaciones" element={<GraficosNominaciones/>}></Route> */}
        </Routes>
        <span className="ir-arriba icon-arrow-up2">
                       <BsChevronUp/>
                      </span>
        </GlobalState>
    </Router>
  </div>
);
}  
export default App;