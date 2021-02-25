import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "../css/doc.css";

import url from '../config';

// proprio
// route fetch info user connecter (populate bail courrier quitance )
// route fetch info all locataire (populate bail courrier quitance )

// route fetch info doc proprio ( populate appartement idproprio)

function Upload() {

  const[dataFile,setDataFile] = useState({})
  const[valueInput,setValueInput] = useState("")
  const[objetFile,setObjetFile] = useState("")
  const[userData,setUserData] = useState({})

  const[userAndProprioData,setUserAndProprioData] = useState({})
  // info appart Locataire
  const[dataAppart,setDataAppart] = useState({})

  // allLocataire
  const[dataAllLocataire,setDataAllLocataire] = useState([])


  const[reloadFetch,setReloadFetch] = useState(false)


  // DOC envoyer
  const[dataLocataireBail,setDataLocataireBail] = useState([])
  const[dataLocataireCourrier,setDataLocataireCourrier] = useState([])
  const[dataLocataireQuittance,setDataLocataireQuittance] = useState([])

  const[mapBBail,setmapBBail] = useState([])
  const[mapCCourrier,setmapCCourrier] = useState([])
  const[mapQQuittance,setmapQQuittance] = useState([])


  // DOC Recu
  const[dataProprioBail,setDataProprioBail] = useState([])
  const[dataProprioQuittance,setDataProprioQuittance] = useState([])
  const[dataProprioCourrier,setDataProprioCourrier] = useState([])

  const[MesBail,setMesBail] = useState([])
  const[MesQuittance,setMesQuittance] = useState([])
  const[MesCourrier,setMesCourrier] = useState([])


  const[mapBail,setmapBail] = useState([])
  const[mapCourrier,setmapCourrier] = useState([])

  // pagination
  const [targetPage, setTargetPage] = useState(1);
  const [nbPage, setNbPage] = useState(0);

  const [locataireChoose, setLocataireChoose] = useState("");



  useEffect(()=>{
    if ( JSON.parse(sessionStorage.getItem("user")) == null ) {
      console.log("localStorage vide");
    }else {
      console.log("localStorage", JSON.parse(sessionStorage.getItem("user")) );
      setUserData(JSON.parse(sessionStorage.getItem("user")))
    }
  },[])

  useEffect(()=>{

    console.log("USEFFECT FETCH");

    if (userData.statususer == "locataire") {

      fetch(url+"infoUserAndProprio", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idUser:userData._id})
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(fetchData => {
        console.log("retour fetch getInfoUserAndProprio",fetchData)
        setUserAndProprioData(fetchData.user)
        setDataAppart(fetchData.user.appartement[0])

        setDataLocataireBail(fetchData.user.bail)
        setDataLocataireCourrier(fetchData.user.courrier)

        setDataProprioBail(fetchData.user.appartement[0].idproprio.bail)
        setDataProprioQuittance(fetchData.user.appartement[0].idproprio.quittance)
        setDataProprioCourrier(fetchData.user.appartement[0].idproprio.courrier)


      }).catch(err => {
        console.log(err)
      })

    }else if (userData.statususer == "proprio") {

      fetch(url+"infoUser", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idUser:userData._id})
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(fetchData => {
        console.log("retour fetch getInfoProprio",fetchData.user)

        setUserAndProprioData(fetchData.user)

        setDataLocataireBail(fetchData.user.bail)
        setDataLocataireCourrier(fetchData.user.courrier)
        setDataLocataireQuittance(fetchData.user.quittance)

      }).catch(err => {
        console.log(err)
      })

      //ALL Locataire
      fetch(url+"allLocataire", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idproprio:userData._id})
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(fetchData => {
        console.log("retour fetch allLocataire",fetchData.user)
        setDataAllLocataire(fetchData.user)

      }).catch(err => {
        console.log(err)
      })

    }


  },[userData,reloadFetch])




    // save doc envoi
    useEffect(()=>{
      console.log("DATA DOC ENVOYER BAIL",dataLocataireBail);
    },[dataLocataireBail])

    useEffect(()=>{
      console.log("DATA DOC ENVOYER COURRIER",dataLocataireCourrier);
    },[dataLocataireCourrier])

    useEffect(()=>{
      console.log("DATA DOC ENVOYER QUITTANCE",dataLocataireQuittance);
    },[dataLocataireQuittance])


    // MesBail Proprio
    useEffect(()=>{
      console.log("dataProprioBail",dataProprioBail);
      setMesBail(dataProprioBail.filter(e => {
        return e.destinataire == userData._id
      } ))

    },[dataProprioBail])

    useEffect(()=>{
      console.log("MesBail",MesBail);

    },[MesBail])

    //Mes Quittance Proprio
    useEffect(()=>{
      console.log("dataProprioQuittance",dataProprioQuittance);
      setMesQuittance(dataProprioQuittance.filter(e => {
        return e.destinataire == userData._id
      } ))

    },[dataProprioQuittance])

    useEffect(()=>{
      console.log("MesQuittance",MesQuittance);
    },[MesQuittance])

    //MES COURRIER Proprio
    useEffect(()=>{
      console.log("dataProprioCourrier",dataProprioCourrier);
      setMesCourrier(dataProprioCourrier.filter(e => {
        return e.destinataire == userData._id
      } ))

    },[dataProprioCourrier])


    useEffect(()=>{
      console.log("MesCourrier",MesCourrier);
    },[MesCourrier])



    if (userData.statususer == "locataire") {
      // MAP DOC Envoyés
      // BAIL
      var mapDocEnvoyerBail = dataLocataireBail.map(doc => {

        var date = new Date(doc.timestamp);

        var jour = "00";
        var mois = "00";
        var année = date.getFullYear();

        if(date.getDate() < 10){
          jour = '0'+ date.getDate()
        }else{
          jour = date.getDate()
        }

        if(date.getMonth() < 10){
          mois = '0' + (date.getMonth()+1)
        }else{
          mois = (date.getMonth()+1)
        }
        return <a target="_blank" href={doc.url}>{"Bail de location "+année}</a>
      })

      // COURRIER
      var mapDocEnvoyerCourrier = dataLocataireCourrier.map(doc => {
        return <a target="_blank" href={doc.url}>{doc.objet}</a>
      })


      // MAP DOC RECU
      // COURRIER
      var mapDocRecuCourrier = MesCourrier.map(doc => {
        return <a target="_blank" href={doc.url}>{doc.objet}</a>
      })


      // BAIL
      var mapDocRecuBail = MesBail.map((doc) => {

        console.log("MAP DOC RECU BAIL",doc);

        var date = new Date(doc.timestamp);

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

        return <a target="_blank" href={doc.url}>{"Bail de location "+année}</a>
      })


      //  PAGINATION QUITTANCE
      var copyQuittanceArray = [...MesQuittance]

      if (copyQuittanceArray.length > 10) {
        var nbDePage = Math.ceil(copyQuittanceArray.length/10)
        if (nbDePage != nbPage) {
          setNbPage(nbDePage)
        }
      }else {
        var nbDePage = 1
        if (nbDePage != nbPage) {
          setNbPage(nbDePage)
        }
      }

      var paginationTableau = copyQuittanceArray.splice((targetPage-1)*10,10)

      var tableMap = [];
      for (var i = 1; i <= nbDePage; i++) {
        tableMap.push(i)
      }

      //BTN Pagination
      var paginationLi;
      paginationLi = tableMap.map(p => {
        if (targetPage > 10) {
          return <li  className="pagination-btn" onClick={()=>{
            setTargetPage(p)
          }}>{p}</li>
        }

      })

      var paginationFirst = <li  onClick={()=>{setTargetPage(1)}}> {"<<"} </li>
      var paginationPrev = <li  onClick={()=>{setTargetPage(targetPage-1)}}> {"<"} </li>
      var paginationSui = <li  onClick={()=>{setTargetPage(targetPage+1)}}> {">"} </li>
      var paginationLast = <li  onClick={()=>{setTargetPage(paginationLi.length)}}> {">>"} </li>


      console.log(paginationTableau);


      // QUITTANCE
      var mapDocRecuQuittance = MesQuittance.map(doc => {
        var date = new Date(doc.timestamp);

        var nomMois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"]

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
        return <a target="_blank" href={doc.url}>{"Quittance "+nomMois[date.getMonth()]+" "+année}</a>
      })

    }



  // Uploade IMAGE

  var handleChangeFile = (event) => {
    console.log("data file",event.target.files[0]);
    setDataFile(event.target.files[0])
  }

  var handleClickConfirm = (event) => {

    console.log("hello jai confirmer");

    const data = new FormData()
    data.append('file', dataFile)


    //ELSE GESTION ERROR
    if (dataFile.name != undefined) {
      if (valueInput.length > 0) {


        console.log(valueInput);
        console.log(userData._id);
        console.log(locataireChoose);
        console.log(objetFile.length);

        if (objetFile.length == 0) {
          var urlFetch = url+"upload-document/"+valueInput+"/"+userData._id+"/"+locataireChoose+"/test"
        }else {
          var urlFetch = url+"upload-document/"+valueInput+"/"+userData._id+"/"+locataireChoose+"/"+objetFile
        }


        fetch(urlFetch, {
          method: 'post',
          body: data
        }).then(res => {
          console.log(res)
          return res.json()
        }).then(picture => {
          console.log("retour fetch upload",picture)
          setReloadFetch(!reloadFetch)


        }).catch(err => {
          console.log(err)
        })
      }
    }


  }








  return (

    <div>

      <Header/>
      <div className="body-bg-doc">

        {userData.statususer=='proprio'?<div className="main-info-doc-3">
          <h1>Selectionner un destinataire</h1>
          <select type='select' onChange={(e)=>{

            setLocataireChoose(e.target.value)

            //DOCUMENT ENVOYER
            //Quittance
            var dataQuittanceLocataireChoose = dataLocataireQuittance.filter(quittance => {
              console.log("quittance",quittance.destinataire._id);
              console.log(e.target.value);
              return quittance.destinataire._id == e.target.value
            } )
            console.log("dataQuittanceLocataireChoose",dataQuittanceLocataireChoose);

            dataQuittanceLocataireChoose.filter(e =>  new Date(e.timestamp).getFullYear() == new Date().getFullYear())

            dataQuittanceLocataireChoose.sort((a,b)=> (a.timestamp> b.timestamp)? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))

            setmapQQuittance(dataQuittanceLocataireChoose.map(doc => {
              var date = new Date(doc.timestamp);

              var nomMois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"]

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
              return <a target="_blank" href={doc.url}>{"Quittance "+nomMois[date.getMonth()]+" "+année}</a>
            }))


            //Courrier
            var dataCourrierLocataireChoose = dataLocataireCourrier.filter(courrier => {
              console.log("courrier",courrier.destinataire._id);
              console.log(e.target.value);
              return courrier.destinataire._id == e.target.value
            } )
            console.log("dataCourrierLocataireChoose",dataCourrierLocataireChoose);

            setmapCCourrier(dataCourrierLocataireChoose.map(doc => {
              return <a target="_blank" href={doc.url}>{doc.objet}</a>
            }))

            //BAIl
            var dataBailLocataireChoose = dataLocataireBail.filter(bail => {
              console.log("bail",bail.destinataire._id);
              console.log(e.target.value);
              return bail.destinataire._id == e.target.value
            } )
            console.log("dataBailLocataireChoose",dataBailLocataireChoose);

            setmapBBail(dataBailLocataireChoose.map(doc => {

              var date = new Date(doc.timestamp);

              var jour = "00";
              var mois = "00";
              var année = date.getFullYear();

              if(date.getDate() < 10){
                jour = '0'+ date.getDate()
              }else{
                jour = date.getDate()
              }

              if(date.getMonth() < 10){
                mois = '0' + (date.getMonth()+1)
              }else{
                mois = (date.getMonth()+1)
              }
              console.log(doc.url);
              return <a target="_blank" href={doc.url}>{"Bail de location "+année}</a>
            }))


            //DOCUMENT RECU

            // BAIL
            console.log("dataAllLocataire",dataAllLocataire);

            var dataLocataireChoose = dataAllLocataire.filter(locataire => {
              return locataire._id == e.target.value
            } )

            console.log("dataLocataireChoose",dataLocataireChoose[0]);


            setmapBail(dataLocataireChoose[0].bail.map(doc => {

              console.log("MAP DOC RECU BAIL",doc);

              var date = new Date(doc.timestamp);

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

              return <a target="_blank" href={doc.url}>{"Bail de location "+année}</a>
            }))

            // COURRIER
            setmapCourrier(dataLocataireChoose[0].courrier.map(doc => {
              return <a target="_blank" href={doc.url}>{doc.objet}</a>
            }))


            dataLocataireChoose[0].courrier.map(doc => {
              return <a target="_blank" href={doc.url}>{doc.objet}</a>
            })

          }}>
            <option value="">Choisir un Locataire</option>
            {dataAllLocataire.map(locataire=> {
              return <option value={locataire._id}>{locataire.firstname+" "+locataire.lastname}</option>
            })}
          </select>

        </div>:<div></div>}

        <div className="main-info-doc-1">

          <h1> Envoyer un document </h1>

          {userData.statususer == "proprio" ? <div style={{display:"flex",justifyContent:"center"}}>

            <input className="checkbox-upload" type="radio" id="quittance" name="radio" data-type="quittance" onChange={(e)=>{
              console.log(e.target.dataset.type);
              var copyRadioData = {...valueInput}
              copyRadioData = e.target.dataset.type
              setValueInput(copyRadioData)
            }}></input><label for="quittance">Quittance</label>

            <input className="checkbox-upload" type="radio" id="bail" name="radio" data-type="bail" onChange={(e)=>{
              console.log(e.target.dataset.type);
              var copyRadioData = {...valueInput}
              copyRadioData = e.target.dataset.type
              setValueInput(copyRadioData)
            }}></input><label for="bail">Bail</label>

            <input className="checkbox-upload" type="radio" id="courrier" name="radio" data-type="courrier" onChange={(e)=>{
              console.log(e.target.dataset.type);
              var copyRadioData = {...valueInput}
              copyRadioData = e.target.dataset.type
              setValueInput(copyRadioData)
            }}></input><label for="courrier">Courrier</label>


          </div> : <div style={{display:"flex",justifyContent:"center"}}>

            <input className="checkbox-upload" type="radio" id="bail" name="radio" data-type="bail" onChange={(e)=>{
              console.log(e.target.dataset.type);
              var copyRadioData = {...valueInput}
              copyRadioData = e.target.dataset.type
              setValueInput(copyRadioData)
            }}></input><label for="bail">Bail</label>

            <input className="checkbox-upload" type="radio" id="courrier" name="radio" data-type="courrier" onChange={(e)=>{
              console.log(e.target.dataset.type);
              var copyRadioData = {...valueInput}
              copyRadioData = e.target.dataset.type
              setValueInput(copyRadioData)
            }}></input><label for="courrier">Courrier</label>

          </div>
          }

          {valueInput == "courrier" ? <div style={{display:'flex',justifyContent:'center'}}>
            <label for="objectFile">L' objet du Fichier :</label>
            <input style={{height:'25px',marginLeft:'10px'}}id="objectFile" type="text" onChange={(e)=>{
              console.log(e.target.value);
              var copyObjetFile = {...objetFile}
              copyObjetFile = e.target.value
              setObjetFile(copyObjetFile)
            }}/>
          </div> : <div></div>}

          <div className="choose-file"><input className="choose-file-btn" type="file" name="file" onChange={handleChangeFile}/></div>
          <button className="upload-btn" type="button" onClick={handleClickConfirm}>Envoyer</button>
        </div>


        <div className="main-info-doc-2">
          <h1> Documents reçu </h1>
          {userData.statususer=='locataire'?<div><div className="quittance menu">Quittances De Loyer</div>
          <div className="link-list">
            {mapDocRecuQuittance}
          </div></div>:<div></div>}

          <ul style={{display:"flex",justifyContent:"center"}}>
            {targetPage == 1 ? "" : paginationFirst}
            {targetPage == 1 ? "" : paginationPrev}
            {paginationLi}
            {nbPage == targetPage ? "" : paginationSui}
            {nbPage == targetPage ? "" : paginationLast}
          </ul>

          <div className="bail menu">Bails de location</div>
          <div className="link-list">
            {mapDocRecuBail}
            {mapBail}

          </div>
          <div className="courriers-divers menu">Courriers</div><div className="link-list">
            {mapDocRecuCourrier}
            {mapCourrier}

          </div>
        </div>


        {userData.statususer=='proprio'?<div className="main-info-doc-2">
            <h1> Documents envoyés </h1>
            <div className="quittance menu">Quittances De Loyer</div>
            <div className="link-list">
              {mapQQuittance}
            </div>
            <div className="bail menu">Bails de location</div>
            <div className="link-list">
              {mapBBail}
            </div>
            <div className="courriers-divers menu">Courriers</div><div className="link-list">
              {mapCCourrier}
            </div>
          </div>
          : <div className="main-info-doc-2"><h1> Documents envoyés </h1>

          <div className="bail menu">Bails de location</div>
          <div className="link-list">
            {mapDocEnvoyerBail}
          </div>

          <div className="courriers-divers menu">Courriers</div>
          <div className="link-list">
            {mapDocEnvoyerCourrier}
          </div>

        </div>}



      </div>
      <Footer/>

    </div>


  );
}

export default Upload;
