import React, {useState, useEffect} from 'react';
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../css/card.css";
import "../css/add.css";

import url from '../config';





function Card() {

  const[userData,setUserData] = useState({})
  const[allAppart,setAllAppart] = useState([])


  useEffect(()=>{
    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
    }
  },[])


  useEffect(()=>{
    if (userData._id != undefined) {

      console.log(userData._id);
      fetch(url+"mesAppart", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idproprio:userData._id})
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(data => {
        console.log("retour find Appart du Proprio",data)
        setAllAppart(data.findAppart)
      }).catch(err => {
        console.log(err)
      })
    }
  },[userData])




  console.log("allAppart",allAppart);


  var mapDataAppart = allAppart.map((e,id) => {

    console.log("e",e);

    console.log();

    return <Link key={id} style={{textDecoration:'none'}} to={"/detailedcard/"+e._id}><div className="card">
      <div><img className="img" src={e.photo[0]}></img></div>
      <div className="title">
        <div>{e.titre}</div>
        <div>-</div>
        <div> {e.idlocataire.length != e.nbmaxlocataire ? "A LOUER" : "OCCUPE" }</div>
      </div>
      <div className="type">
        <div>{e.categorie}</div>
        <div>{e.meuble ? "Meublé" : "Pas Meublé"}</div>
        <div>{e.surface+"m2"}</div>
      </div>
      <div className="price">
        <div>{e.prix+" euros / mois"} </div>
        <div>{e.charge ? "Avec Charge" : "Hors Charge"}</div>
      </div>
    </div></Link>

  })



  return (
  <div>
    <Header/>
    <div className="body-bg-card">

      <div className="body-bg-card-container">

            <Link to="/add"><div className="addcard"></div></Link>

            {mapDataAppart}


      </div>
    </div>
    <Footer/>

  </div>

  );

}

export default Card;
