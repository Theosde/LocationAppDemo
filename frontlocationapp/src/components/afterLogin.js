import React from 'react';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from "react-router-dom";
import "../css/doc.css";


function AfterLogin() {



  return (

  <div>
    <div className="body-bg-doc">
      <div className="errorMessDiv">
          <p>Contacter votre propriétaire</p>
          <Link  className="form-check-label2" to="/connection">Retour à la page de connection</Link>
      </div>
    </div>
  </div>

  );

}

export default AfterLogin;
