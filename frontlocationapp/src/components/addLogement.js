import React, {useState, useEffect} from 'react';
import "../css/addLogement.css";
import {BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

import url from '../config';



function AddLogement() {




  const[dataFile,setDataFile] = useState({})

  const[userData,setUserData] = useState({})

  const[dataFom,setDataForm] = useState({
    titre: "",
    desc: "",
    rue:"",
    codePostal:"",
    ville:"",
    pays:"",
    surface: "",
    prix: "" ,
    nbmaxlocataire: "" ,
    categorie: "",
    meuble: false,
    charge: false,
    coloc: false,
  })

  const[errorMsg,setErrorMsg] = useState("")
  const[redirection,setRedirection] = useState(false)


  useEffect(()=>{

    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
    }

  },[])


  var handleChangeFile = (event) => {
    console.log("data file",event.target.files[0]);
    setDataFile(event.target.files[0])
  }

  var handleClickConfirm = (event) => {

    console.log("Je confirme le form");



    if (dataFile.name == undefined) {

      // Error
      console.log("vide ou error");

      setErrorMsg("Image non Defini")

    }else {
      console.log("ok c bon");

      dataFom.idproprio = userData._id
      console.log("new",dataFom );
      console.log("file",dataFile );

      if (!dataFom.coloc) {
        console.log("ok");
        dataFom.nbmaxlocataire = 1
      }

      const data = new FormData()
      data.append('file', dataFile)


      fetch(url+"add-appart", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFom)
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(appart => {
        console.log("retour fetch AddAppart",appart.appart)


        fetch(url+"upload-imgAppart/"+appart.appart.titre+"/"+appart.appart._id+"/"+userData._id, {
          method: 'post',
          body: data
        }).then(res => {
          console.log(res)
          return res.json()
        }).then(picture => {
          console.log("retour fetch upload",picture)

          setRedirection(true)

        }).catch(err => {
          console.log(err)
        })


      }).catch(err => {
        console.log(err)
      })




    }

  }

  if (redirection) {
    return <Redirect to="/appart" />
  }

  return (

    <div style={{ width: "100%", height:"100vh"}}>
    <Header/>


        <div className="body-bg-addLogement">
          <div className="form-container">
            <input type="text" className="nameInput" placeholder="Nom"  value={dataFom.titre} onChange={(e)=> {
                var copyDataForm = {...dataFom}
                copyDataForm.titre = e.target.value
                setDataForm(copyDataForm)
            } }></input>
            <textarea placeholder='Description ici' maxlength="250" value={dataFom.desc} onChange={(e)=> {
                var copyDataForm = {...dataFom}
                copyDataForm.desc = e.target.value
                setDataForm(copyDataForm)
            } }></textarea>
            <input type="text" className="countryInput" id="" placeholder="Pays" value={dataFom.pays} onChange={(e)=> {
                var copyDataForm = {...dataFom}
                copyDataForm.pays = e.target.value
                setDataForm(copyDataForm)
            } }></input>
            <div className="townInput">
              <input type="text" className="cpInput" id="" placeholder="Code Postale"  value={dataFom.codePostal} onChange={(e)=> {
                  var copyDataForm = {...dataFom}
                  copyDataForm.codePostal = e.target.value
                  setDataForm(copyDataForm)
              } }></input>
              <input type="text" className="villeInput" id="" placeholder="Ville" value={dataFom.ville} onChange={(e)=> {
                  var copyDataForm = {...dataFom}
                  copyDataForm.ville = e.target.value
                  setDataForm(copyDataForm)
              } }></input>
            </div>
            <input type="text" className="adressInput" id="" placeholder="Adresse" value={dataFom.rue} onChange={(e)=> {
                var copyDataForm = {...dataFom}
                copyDataForm.rue = e.target.value
                setDataForm(copyDataForm)
            } }></input>

            <div className="flex-addLogement">
              <label>Type de bien :</label>
              <select name="type" style={{display:"flex",justifyContent:"center"}} value={dataFom.categorie} onChange={(e)=> {
                var copyDataForm = {...dataFom}
                copyDataForm.categorie = e.target.value
                setDataForm(copyDataForm)
              } }>
                <option vlaue=""  selected>- Choisissez un type de bien -</option>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
                <option value="T5">T5</option>
                <option value="duplex">Duplex</option>
                <option value="suplex">Suplex</option>
                <option value="loft">Loft</option>
              </select>
            </div>

            <div className="statusCheckbox">
              <label className="addLogement-label-2">Avec / Sans meubles :</label>
              <input checked={dataFom.meuble} className="checkbox-upload" type="radio" id="meubler" name="etat" onChange={(e)=>{
                console.log(e.target.value);
                var copyDataForm = {...dataFom}
                copyDataForm.meuble = !copyDataForm.meuble
                setDataForm(copyDataForm)
              }}></input><label for="meubler">Meublé</label>
              <input checked={!dataFom.meuble} className="checkbox-upload" type="radio" id="nonMeubler" name="etat" onChange={()=>{
                var copyDataForm = {...dataFom}
                copyDataForm.meuble = !copyDataForm.meuble
                setDataForm(copyDataForm)
              }}></input><label for="nonMeubler">Non meulé</label>
            </div>

            <div className="supDiv">
              <input type="number" className="superficieInput" id="" placeholder="Superficie" value={dataFom.surface} onChange={(e)=> {
                  var copyDataForm = {...dataFom}
                  copyDataForm.surface = e.target.value
                  setDataForm(copyDataForm)
              } }></input>
            </div>

            <div className="statusCheckbox">
              <input type="number" className="priceInput" id="" placeholder="Prix du loyer" value={dataFom.prix} onChange={(e)=> {
                  var copyDataForm = {...dataFom}
                  copyDataForm.prix = e.target.value
                  setDataForm(copyDataForm)
              } }></input>
              <input checked={dataFom.charge} className="checkbox-upload" type="radio" id="cComprise" name="meuble" onChange={()=>{
                var copyDataForm = {...dataFom}
                copyDataForm.charge = !copyDataForm.charge
                setDataForm(copyDataForm)
              }}></input><label className="resp-label" for="cComprise">Charges comprises</label>
              <input checked={!dataFom.charge} className="checkbox-upload" type="radio" id="cNonComprise" name="meuble" onChange={()=>{
                var copyDataForm = {...dataFom}
                copyDataForm.charge = !copyDataForm.charge
                setDataForm(copyDataForm)
              }}></input><label className="resp-label" for="cNonComprise">Charges non comprises</label>
            </div>

            <div className="statusCheckbox-2">
              <label className="addLogement-label-3">Type de location :</label>
              <input checked={dataFom.coloc} className="checkbox-upload" type="radio" id="coloc" onChange={()=>{
                console.log("click 1");
                var copyDataForm = {...dataFom}
                copyDataForm.coloc = !copyDataForm.coloc
                setDataForm(copyDataForm)
              }}></input><label for="coloc">Colocation</label>
              <input checked={!dataFom.coloc} className="checkbox-upload" type="radio" id="pasColoc" onChange={()=>{
                console.log("click 2");
                var copyDataForm = {...dataFom}
                copyDataForm.coloc = !copyDataForm.coloc
                setDataForm(copyDataForm)
              }}></input><label for="pasColoc">Location classique</label>
            </div>
            {dataFom.coloc ?
              <div className="maxLoc">
                <label className="addLogement-label-4">Nombre de locataire:</label>
                <input type="number"  className="maxLocInput" id="" placeholder="Nombre max de locataires" value={dataFom.nbmaxlocataire} onChange={(e)=> {
                    var copyDataForm = {...dataFom}
                    copyDataForm.nbmaxlocataire = e.target.value
                    setDataForm(copyDataForm)
                } }></input>
              </div> : <div></div>
            }
            <div className="statusCheckbox">
              <input type="file" name="file" onChange={handleChangeFile}/>
            </div>

            <div style={{marginTop:"25px", color:"red", fontSize:"18px"}}>{errorMsg.length >= 0 ? errorMsg : ""  }</div>

            <button className="upload-btn-addlogement" type="button" onClick={handleClickConfirm}>Valider</button>

            </div>
        </div>


    <Footer/>
  </div>
  );
}



export default AddLogement;
