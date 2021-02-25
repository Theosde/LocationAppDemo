import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../css/header.css";



function Header() {

  const[userData,setUserData] = useState({})
  const[infoAppart,setInfoAppart] = useState({})

  useEffect(()=>{
  if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
    console.log("localStorage vide");
  }else {
    console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
    setUserData(JSON.parse(sessionStorage.getItem("user")))
    setInfoAppart(JSON.parse(sessionStorage.getItem("user")).appartement[0])
  }
  },[])


  return (

        <div className="header-bg">
            <ul>
              <li>
                <Link className="Link left" to="/info"><div className="icon-1"></div><span>Mes Infos</span></Link>
              </li>
              <li>
                {userData.statususer=='proprio'?<Link className="Link" to="/appart"><div className="icon-2"></div><span>Mes Logements</span></Link>:<Link className="Link" to={"/monappart/"+infoAppart._id}><div className="icon-2"></div><span>Mon Logement</span></Link>}
              </li>
              <li>
                <Link className="Link" to="/documents"><div className="icon-3"></div><span>Mes Documents</span></Link>
              </li>
              <li>
                <Link className="Link right" to="/messages"><div className="icon-4"></div><span>Messagerie</span></Link>
              </li>
            </ul>
        </div>


  );
}

export default Header;
