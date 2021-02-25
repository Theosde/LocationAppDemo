import React, {useState, useEffect} from 'react';
import Header from "./header";
import Footer from "./footer";
import "../css/info.css";


import {Image} from 'cloudinary-react';



import url from '../config';



function Info() {

  const[userData,setUserData] = useState({})

  useEffect(()=>{
    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
    }
  },[])


  console.log(userData);


  //DATE LIVRAISON
  var date = new Date(userData.birthday);

  //console.log("date",date)

  var jour = "00";
  var mois = "00";
  var année = date.getFullYear();

  if(date.getDate() < 10){
  jour = '0'+ date.getDate()
  }else{jour = date.getDate()
  }

  if(date.getMonth() < 10){
    mois = '0' + (date.getMonth()+1)
  }else{
    mois = (date.getMonth()+1)
  }



// UPLOAD


const[dataFile,setDataFile] = useState({})


var handleChangeFile = (event) => {
  console.log("data file",event.target.files[0]);
  setDataFile(event.target.files[0])
}

var handleClickConfirm = (event) => {

  console.log("hello jai confirmer");

  const data = new FormData()
  data.append('file', dataFile)


  fetch(url+"upload_rib/"+userData._id, {
    method: 'POST',
    body: data
  }).then(res => {
    console.log(res)
    return res.json()
  }).then(picture => {
    console.log("retour fetch upload",picture)

  }).catch(err => {
    console.log(err)
  })


}

if (userData != undefined) {
  console.log(userData._id);
console.log("userdata info ok");
}else {
  console.log("userdata info AAAAAAAAAAAAAAAAA");

}

console.log("rib/"+userData._id);

  return (
  <div>
    <Header/>
    <div className="body-bg-info">

      <div className="main-info">


          <div className="generals-infos-col">
            <div className="name">Nom</div>
            <div className="surname">Prenom</div>
            <div className="birthdate">Date de naissance</div>
            <div className="phone">Téléphone</div>
            <div className="mail">Email</div>
          </div>

          <div className="filled-infos-col">
            <div className="filled-name">{userData.lastname}</div>
            <div className="filled-surname">{userData.firstname}</div>
            <div className="filled-birthdate">{jour+'/'+mois+'/'+année}</div>
            <div className="filled-phone"><p>{userData.phone}</p></div>
            <div className="filled-mail"><p>{userData.email}</p></div>
          </div>


          <div className="button-col">
            <p className="modif-btn">Modifier</p>
            <p className="modif-btn">Modifier</p>
          </div>

      </div>

      {userData.statususer=='proprio'?<div className="main-info-rib">
        <div>R.I.B</div>

        <Image cloudName="dyt3mhoy6" className="uploaded-rib" publicId={"https://res.cloudinary.com/dyt3mhoy6/rib/RIB-"+userData._id} width="600" crop="scale"/>

        <input type="file" name="file" onChange={handleChangeFile}/>
        <button className="upload-rib-btn" type="button" onClick={handleClickConfirm} >Upload</button>
      </div>:<div >
      </div>}




    </div>
    <Footer/>

  </div>

  );

}

export default Info;
