import React from 'react';
import Header from "./header";
import Footer from "./footer";
import "../css/doc.css";


function Documents() {

    const[userData,setUserData] = useState({})

  useEffect(()=>{
    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
    }
  },[])

  return (
  <div>
    <Header/>
    <div className="body-bg-doc">

      <div className="main-info-doc">
        <h1>télécharger un document</h1>
        <input type="file" name="file" onChange={handleChangeFile}/>
        <button type="button" onClick={handleClickConfirm}>Upload</button>
      </div>

      <div className="main-info-doc">
        <h1>Recevoir un document</h1>





      </div>




    </div>
    <Footer/>

  </div>

  );

}

export default Documents;
