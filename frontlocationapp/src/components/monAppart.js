import React, {useState, useEffect} from 'react';
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../css/detailedcard.css";
import "../css/add.css";

import {Image} from 'cloudinary-react';



import url from '../config';




function MonAppart(props) {

  const[basicState,setbasicState] = useState(false);
  const[infosAppart,setStateInfosAppart] = useState({});
  const[infosAdress,setStateInfosAdress] = useState({});
  const[inputEmail,setStateInputEmail] = useState('');
  const[allLocataire,setStateAllLocataire] = useState([]);
  const[actu,setStateActu] = useState(false);
  const[userData,setUserData] = useState({});
  const [infosProprio,setInfosProprio] = useState ({});
  const [dataRib,setDataRib] = useState ({});



 const [errorAddLocataire,setStateErrorAddLocataire] = useState('')



  useEffect(()=>{
    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
      if (JSON.parse(sessionStorage.getItem("user")).appartement.length == 0) {
        setInfosProprio([])
        setDataRib([])
      }else {
        setInfosProprio(JSON.parse(sessionStorage.getItem("user")).appartement[0].idproprio)
        setDataRib(JSON.parse(sessionStorage.getItem("user")).appartement[0].idproprio.rib)
      }
    }
  },[])

console.log(dataRib.url);

console.log("infosProprio",infosProprio.lastname);
  useEffect(()=>{
      console.log('je suis dans le fetch');
      fetch(url+"detailAppart", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idappart:props.match.params.idappart})
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(data => {
        console.log("retour find Appart du Proprio",data)
        console.log(data.findAppart.idlocataire.length);
        console.log(allLocataire.length);
        if(data.findAppart.idlocataire.length == allLocataire.length & data.findAppart.idlocataire.length > 0 & allLocataire.length > 0){
          setStateErrorAddLocataire(<div className='errorMessAddLoc'>Le locataire que vous essayez d'ajouter n'existe pas ou à déja été ajouté</div>)
        };


        setStateInfosAppart (data.findAppart);
        console.log(data.findAppart.adresse.rue);
        setStateInfosAdress(data.findAppart.adresse);
        setStateAllLocataire(data.findAppart.idlocataire);

      }).catch(err => {
        console.log(err)
      })

  },[actu])

  var deleteLocataire = (emailLoca) =>{
    console.log(emailLoca);

    fetch(url+"supprLocataire", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({idAppart:props.match.params.idappart,email:emailLoca})
    }).then(res => {
      console.log(res)
      return res.json()
    }).then(data => {
      console.log("retour find Appart du Proprio",data)
      setStateActu(!actu);
    }).catch(err => {
      console.log(err)
    })
  };

var addLoc = () =>{
  fetch(url+"ajoutLocataire", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({idAppart:infosAppart._id ,email:inputEmail})
  }).then(res => {
    console.log(res)
    return res.json()
  }).then(data => {
    console.log("retour find Appart du Proprio",data)
    setStateActu(!actu);
    setStateErrorAddLocataire('')
    setStateInputEmail('')
  }).catch(err => {
    console.log(err)
  })
};

  console.log("props",props.match.params.idappart);
  console.log(infosAppart);

  var mapAllLocat = allLocataire.map((e,id) => {

    console.log("e",e);


    return <div style={{width:'100%'}}>
        <div className="locataire">
          <div className="loc-name">{e.firstname} {e.lastname}</div>
          <div className="loc-infos">Tél: {e.phone} / {e.email}</div>
          <div className="more-infos-btn" onClick={() => {
            setbasicState(!basicState)

          }}></div>
          <div className="delete-loc" onClick={() => deleteLocataire(e.email)}></div>
        </div>
        {basicState ?<div className="depliant">
          <div className="garant"> Garant :</div>
          <div className="garant-name">Arnaud REY</div>
          <div className="garant-infos">Tél:07.56.78.90.01</div>
          <div className="garant-infos">Mail:arey@gmail.com</div>
        </div> : <div></div>}
    </div>

  })




  return (
  <div>
    <Header/>
    <div className="body-bg-detailedcard">

      <div className="detailed-name-card"><h2>{infosAppart.titre}</h2></div>

      {userData.statususer=='proprio'?<div className="detailedcard">
        <div className="detailed-img-container"><img className="detailed-img" src={infosAppart.photo}></img></div>
      </div>:<div className="detailed-infos-card">
            <h1>Informations de mon proprétaire</h1>
            <div className="detailed-infos-card-5">
            <div className="orga-column-proprio-infos">
              <div><strong>Nom </strong></div>
              <div><strong>Prénom </strong></div>
              <div><strong>Email   </strong></div>
            </div>
            <div className="orga-column-proprio-infos">
              <div> {infosProprio.lastname}</div>
              <div> {infosProprio.firstname}</div>
              <div> {infosProprio.email}</div>
            </div>
          </div>
            </div>}

      {userData.statususer=='locataire'?<div className="detailed-infos-card2">
        <h1 style={{width:'100%'}}>R.I.B</h1>
        <a href={dataRib.url} download>
          <Image className="uploaded-rib" cloudName="dyt3mhoy6" publicId={dataRib.url} width="600" crop="scale" download/>
        </a>
      </div>:<div></div>}


      <div className="detailed-infos-card">
        <div className="bien-infos">
          <div style={{width:'100%'}} className="complete-infos"><h1 style={{width:'100%'}}>Description du bien</h1> </div>
          <div style={{marginBottom:'15px',textAlign: 'justify',textJustify: 'inter-word'}}> {infosAppart.desc}</div>
        </div>
        <div className="adress-infos">
          <div className="complete-adress">Adresse Complète :</div>
          <div><strong>Pays :</strong>{infosAdress.pays}</div>
          <div> <strong>Cp :</strong> {infosAdress.codePostal}</div>
          <div> <strong>Ville :</strong>{infosAdress.ville}</div>
          <div><strong>Rue :</strong>{infosAdress.rue}</div>
        </div>
        <div className="bien-infos">
          <div className="complete-infos">Détails du bien : </div>
          <div><strong>Type :</strong> {infosAppart.categorie}</div>
          <div><strong>Meublé :</strong> {infosAppart.meuble ? "Meublé" : "Pas Meublé"}</div>
          <div><strong>Surface:</strong> {infosAppart.surface} m2</div>
        </div>
        <div className="location-infos">
          <div className="complete-location">Détails de la location : </div>
          <div><strong>Prix :</strong> {infosAppart.prix}Euros/mois </div>
          <div><strong>Charges :</strong>{infosAppart.charge ? "Avec Charge" : "Hors Charge"}</div>
          <div><strong>Disponibilité :</strong> Occupée</div>
        </div>
      </div>
      {userData.statususer=='locataire'?<div></div>:<div className="delete-appart"> Supprimer Cet Appartement</div>}

    </div>
    <Footer/>

  </div>

  );

}

export default MonAppart;
