import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import url from '../config';


function AddAppart() {

  const[dataFile,setDataFile] = useState({})


  var handleChangeFile = (event) => {
    console.log("data file",event.target.files[0]);
    setDataFile(event.target.files[0])
  }

  var handleClickConfirm = (event) => {

    console.log("hello jai confirmer");

    const data = new FormData()
    data.append('file', dataFile)


    fetch(url+"add-appart", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            titre: "titre Appart Test",
            rue:"24 rue qsdqsqsd",
            codePostal:"69008",
            ville:"Lyon",
            pays:"France",
            desc: " BLS blabla bla bla blabla blabla bla bla bla",
            surface: 24,
            prix: 755.54,
            categorie: "T3",
            nbmaxlocataire: 2,
            meuble: true,
            charge: false,
            coloc: true,
            idproprio: "5da0318b74e5f50017e8a255"
          })
    }).then(res => {
      console.log(res)
      return res.json()
    }).then(appart => {
      console.log("retour fetch AddAppart",appart.appart)


      fetch(url+"upload-imgAppart/"+appart.appart.titre+"/"+appart.appart._id, {
        method: 'post',
        body: data
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(picture => {
        console.log("retour fetch upload",picture)

      }).catch(err => {
        console.log(err)
      })


    }).catch(err => {
      console.log(err)
    })


  }


  return (

    <div>

      <h1>Add Appart</h1>

        <input type="file" name="file" onChange={handleChangeFile}/>

        <button type="button" onClick={handleClickConfirm}>Upload</button>

    </div>


  );
}

export default AddAppart;
