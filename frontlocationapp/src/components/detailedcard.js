import React, {useState, useEffect} from 'react';
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "../css/detailedcard.css";
import "../css/add.css";

import url from '../config';




function DetailedCard(props) {

  const[basicState,setbasicState] = useState(false);
  const[infosAppart,setStateInfosAppart] = useState({});
  const[infosAdress,setStateInfosAdress] = useState({});
  const[inputEmail,setStateInputEmail] = useState('');
  const[allLocataire,setStateAllLocataire] = useState([]);
  const[actu,setStateActu] = useState(false);

  const[userData,setUserData] = useState({})

  const [errorAddLocataire,setStateErrorAddLocataire] = useState('')

  const [isSuppr,setIsSuppr] = useState(false)

  useEffect(()=>{
    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
    }
  },[])


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

      <div className="detailedcard">
        <div className="detailed-img-container"><img className="detailed-img" src={infosAppart.photo}></img></div>
      </div>

      <div className="detailed-loc-card">
        <div className="up">
          <input className="add-locataire" placeholder="Ajouter un locataire à mon logement" value={inputEmail} onChange={(e)=> {
              var copyinputEmail = {...inputEmail}
              copyinputEmail= e.target.value
              setStateInputEmail(copyinputEmail)
          } }></input>
          <div className="add-loc-btn" onClick={addLoc}>+</div>

        </div>
        {errorAddLocataire}
        <div className="down">
          {mapAllLocat}
        </div>
      </div>


      <div className="detailed-infos-card">
        <div className="bien-infos">
          <div className="complete-infos">Description du bien : </div>
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
      <div className="delete-appart" onClick={()=>{
        fetch(url+"supprAppart/"+infosAppart._id, {
          method: 'POST',
        }).then(res => {
          console.log(res)
          return res.json()
        }).then(data => {
          console.log("retour fetch suppr appart",data)
          setIsSuppr(!isSuppr)
        }).catch(err => {
          console.log(err)
        })
      }}> Supprimer Cet Appartement</div>

    </div>
    <Footer/>

    {isSuppr ? <Redirect to="/appart" /> : ""}

  </div>

  );

}

export default DetailedCard;
