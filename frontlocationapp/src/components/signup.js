import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from "react-router-dom";
import "../css/suscribe.css";

import islog from "./moduleAuth"




function Signup() {

  const[signUpData,setSignUpData] = useState({firstname:"",lastname:"",email:"",password:"",confirmPassword:"",phone:"",naissance:"",status:true})

  const[actualisationPage,setActualisationPage] = useState(false)

  const[errorInput,setErrorInput] = useState({date:"",phone:"",email:"",password:"",confirmPassword:"", error:false})

console.log(islog.islog);
console.log(signUpData);
  return (

    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"(500px"}}>

      <div className="body-bg-suscribe">


        <form className="form-config">

          <div className="form-group">
            <label>Statut du compte</label>
            <br/>
              <div className="radioContainer" style={{width:'100%'}}>
                <input checked={signUpData.status} type="radio" name="status" value="locataire" onChange={()=>{
                  var copysignUpData = {...signUpData}
                  copysignUpData.status = !copysignUpData.status
                  setSignUpData(copysignUpData)
                }}/> <p>Locataire</p>
                <input checked={!signUpData.status} type="radio" name="status" value="propriétaire" onChange={()=>{
                  var copysignUpData = {...signUpData}
                  copysignUpData.status = !copysignUpData.status
                  setSignUpData(copysignUpData)
                }}/> <p>Propriétaire</p>
            </div>
          </div>

          <div className="form-org-1">
            <div className="form-group">
              <label for="Name">Nom</label>
              <input type="text" className="form-control" id="Name" placeholder="Mot de passe" value={signUpData.lastname} onChange={(e)=> {
                  var copysignUpData = {...signUpData}
                  copysignUpData.lastname = e.target.value
                  setSignUpData(copysignUpData)
              } }/>
            </div>
            <div className="form-group">
              <label for="Surname">Prénom</label>
              <input type="text" className="form-control" id="Surname" placeholder="Mot de passe" value={signUpData.firstname} onChange={(e)=> {
                  var copysignUpData = {...signUpData}
                  copysignUpData.firstname = e.target.value
                  setSignUpData(copysignUpData)
              } }/>
            </div>
          </div>

          <div className="form-group">
            <label for="Naissance">Date de Naissance</label>
            <input type="date" className="form-control" id="Naissance" placeholder="Entrer votre téléphone" value={signUpData.naissance} onChange={(e)=> {
                var copysignUpData = {...signUpData}
                copysignUpData.naissance = e.target.value
                setSignUpData(copysignUpData)
            } }/>
            {errorInput.date.length > 0 ? <div>{errorInput.date}</div> :  <div></div>}
          </div>

          <div className="form-group">
            <label for="phone">Téléphone</label>
            <input type="tel" className="form-control" id="phone" placeholder="Entrer votre téléphone" value={signUpData.phone} onChange={(e)=> {
                var copysignUpData = {...signUpData}
                copysignUpData.phone = e.target.value
                setSignUpData(copysignUpData)
            } }/>
            {errorInput.phone.length > 0 ? <div>{errorInput.phone}</div> :  <div></div>}
          </div>

          <div className="form-group">
            <label for="email">Adresse Mail</label>
            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer votre email" value={signUpData.email} onChange={(e)=> {
                var copysignUpData = {...signUpData}
                copysignUpData.email = e.target.value
                setSignUpData(copysignUpData)
            } }/>
            {errorInput.email.length > 0 ? <div>{errorInput.email}</div> :  <div></div>}
            {islog.getResultFetchSignin.error != undefined  ?  <div>{islog.getResultFetchSignin.error}</div>  : <div></div>}
          </div>


          <div className="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Mot de passe" value={signUpData.password} onChange={(e)=> {
                var copysignUpData = {...signUpData}
                copysignUpData.password = e.target.value
                setSignUpData(copysignUpData)
            } }/>
            {errorInput.password.length > 0 ? <div>{errorInput.password}</div> :  <div></div>}
          </div>

          <div className="form-group">
            <label for="confpassword">Confirme Mot de passe</label>
            <input type="password" className="form-control" id="confpassword" placeholder="Confirme Mot de passe" value={signUpData.confirmPassword} onChange={(e)=> {
                var copysignUpData = {...signUpData}
                copysignUpData.confirmPassword = e.target.value
                setSignUpData(copysignUpData)
            } }/>
            {errorInput.confirmPassword.length > 0 ? <div>{errorInput.confirmPassword}</div> :  <div></div>}
          </div>
          <div className="form-group form-check">
            <Link  className="form-check-label" to="/connection">Se Connecter</Link>
          </div>

          <button style={{marginBottom:"15px"}} className="btn btn-primary" onClick={(event)=>{
            event.preventDefault()



            var copyErrorInput = {...{date:"",phone:"",email:"",password:"",confirmPassword:"",error:false}}

            // // verif email
            // var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            // if (!regexEmail.test(signUpData.email)) {
            //   copyErrorInput.email = "format de email invalide"
            //   copyErrorInput.error = true
            // }

            // // verif password
            // var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            // if (regexPassword.test(signUpData.password)) {
            //   if (signUpData.password != signUpData.confirmPassword) {
            //     copyErrorInput.confirmPassword = "confirme Password invalide"
            //     copyErrorInput.error = true
            //   }
            // }else {
            //   copyErrorInput.password = "Format password invalide au moins 8 caractère dont une lettre en Maj et un nombre"
            //   copyErrorInput.error = true
            // }

            // verif date
            var regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
            if (regexDate.test(signUpData.naissance)) {
              var datenaissance = new Date(signUpData.naissance)
            }else {
              copyErrorInput.date = "formate de la date invalide"
              copyErrorInput.error = true
            }

            //verif phone
            var regexPhone = /^((\+)33|0)[1-9](\d{2}){4}$/
            if (!regexPhone.test(signUpData.phone)) {
              copyErrorInput.phone = "format téléphone invalide"
              copyErrorInput.error = true
            }

            if (copyErrorInput.error) {
              setErrorInput(copyErrorInput)
            }else {
              var statusUser ;
              if (signUpData.status == true) {
                statusUser = "locataire"
              }else {
                statusUser = "proprio"
              }
              islog.signup(signUpData.firstname,signUpData.lastname,datenaissance,signUpData.email,signUpData.phone,signUpData.password,statusUser);
              setActualisationPage(!actualisationPage);
            }




          }}>Sinscrire</button>
        </form>

        {islog.islog ? <Redirect to="/afterlogin" /> : <div></div>}


      </div>

    </div>


  );
}

export default Signup;
