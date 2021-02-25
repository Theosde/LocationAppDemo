import React, {useState, useEffect} from 'react';
import "../css/login.css";
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from "react-router-dom";

import islog from "./moduleAuth"


function Login({match}) {

  const[signInData,setSignInData] = useState({email:"",password:""})

  const[actualisationPage,setActualisationPage] = useState(false)

  const[redirect,setredirect] = useState("")

  useEffect(()=>{
    //islog.islog = false;

    if ( JSON.parse(localStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(localStorage.getItem("user")) );
      setSignInData(JSON.parse(localStorage.getItem("user")))
    }

  },[])

  useEffect(()=>{

    console.log("hello login")

    if (islog.islog) {
      if (islog.getResultFetchSignin.user != undefined) {
        if (islog.getResultFetchSignin.user.statususer == "proprio") {
          setredirect(<Redirect to="/appart"/>)
        }else {
          console.log("islog.getResultFetchSignin.user.appartement[0]._id",islog.getResultFetchSignin.user.appartement);
          if (islog.getResultFetchSignin.user.appartement.length == 0 ) {
            console.log("PAS D APPART AU LOCATAIRE");
            islog.islog = false;
            setredirect(<Redirect to="/afterlogin"/>)
          }else {
            setredirect(<Redirect to={'/monappart/'+islog.getResultFetchSignin.user.appartement[0]._id}/>)
          }
        }
      }

    }


  },[islog.islog])
  

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh"}}>

      <div className="body-bg-login">


        <form className="form-config-login">
          <div className="form-group">
            <label for="exampleInputEmail1">Adresse Mail</label>
            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Entrer votre email" value={signInData.email} onChange={(e)=> {
                var copysignInData = {...signInData}
                copysignInData.email = e.target.value
                setSignInData(copysignInData)
            } }/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Mot de passe</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Mot de passe" value={signInData.password} onChange={(e)=> {
                var copysignInData = {...signInData}
                copysignInData.password = e.target.value
                setSignInData(copysignInData)
            } }/>
          </div>
          <div className="form-group form-check">
            <Link className="form-check-label" to="/inscription">S'inscrire</Link>
          </div>

          {islog.getResultFetchSignin.error == undefined  ? <div></div> : islog.getResultFetchSignin.error == "" ? <div></div> :  <div className='errorMessAddLoc' style={{marginBottom:'15px'}}>{islog.getResultFetchSignin.error}</div> }

          <button style={{marginBottom:"15px"}} className="btn btn-primary" onClick={(event)=>{
            event.preventDefault()
            islog.signin(signInData.email,signInData.password,()=>{setActualisationPage(!actualisationPage)})
          }} >Connection</button>


        </form>

        {redirect}

      </div>

    </div>
  );
}







export default Login;
