var express = require('express');
var router = express.Router();


var userModel = require('../models/usersModel')
var appartModel = require('../models/appartModel')


// // AGGREGATE DEBUT BASE DE LAGGREGATION
// var mongoose = require('mongoose')
// var idLocataire = "5d8e148c6a42de24382f218c"
//
// userModel.aggregate([{ $match : {_id: new mongoose.Types.ObjectId(req.body.idUser) } }])
// .exec(function (err, findUser) {
//   console.log('findUser',findUser);
// })


// Dependencies.
const fs = require('fs');

// const fileUpload = require('express-fileupload');
// router.use(fileUpload());

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dyt3mhoy6',
  api_key: '756194836344217',
  api_secret: 'TFBAI0d5380jdxswn0So0Tggm_o'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST NEW PHOTO */
router.post('/upload', function(req, res, next) {

  console.log("log req.files", req.files);

  var randomName = Math.floor(Math.random() * 1000000)

  // titreappart_categorieUpload_ramdom
  var photoPath = `public/images/nomImageAChoisir-${randomName}.jpg`;
  var filename = req.files.file;

  console.log("filename",filename)

  filename.mv(photoPath, function(err) {
    if (err){
      return res.status(500).send(err);
    }

    cloudinary.v2.uploader.upload(photoPath,{folder: "image-Appart/",use_filename: true},
      function(error, result){
        if(result){
          console.log(result)
          console.log("je suis ici")

          // Delete a file.
          const fs = require('fs');
          fs.unlinkSync(photoPath)

          res.json({result:true, image:result})

        } else {
          console.log("Error Save Cloudinary",error)
        }
      })
  })
})

//RIB Upload
router.post('/upload_rib/:idproprio', function(req, res, next) {

  console.log("log req.files", req.files);

  console.log("log req.body", req.body);

  var randomName = Math.floor(Math.random() * 1000000)

  // titreappart_categorieUpload_ramdom
  if (req.files.mimetype == "image/jpeg") {
    var photoPath = `public/images/RIB-${req.params.idproprio}.jpg`;
  }else if (req.files.mimetype == "application/pdf") {
    var photoPath = `public/images/RIB-${req.params.idproprio}.pdf`;
  }else {
    var photoPath = `public/images/RIB-${req.params.idproprio}.jpg`;
  }
  var filename = req.files.file;

  console.log("photoPath",photoPath);

  filename.mv(photoPath, function(err) {
    if (err){
      return res.status(500).send(err);
    }

    cloudinary.v2.uploader.upload(photoPath,{folder: "rib/",use_filename: true, unique_filename: false},
      function(error, result){
        if(result){
          console.log(result)
          console.log("je suis ici")

          // Delete a file.
          const fs = require('fs');
          fs.unlinkSync(photoPath)

          userModel.findOneAndUpdate(
            {_id:req.params.idproprio},
            { rib:  {timestamp: Date.now() ,url:result.secure_url } },
            {new:true})
          .exec(function (err, findUser) {
            console.log(findUser);
            res.json({result:true, user:findUser, image:result })

          })
        } else {
          console.log("Error Save Cloudinary",error)
        }
      })
  })

})

/* POST NEW PHOTO */
router.post('/upload-imgAppart/:nameAnnonce/:idAppart/:idUser', function(req, res, next) {


  console.log("log req.params", req.params);

  var randomName = Math.floor(Math.random() * 1000000)

  // titreappart_categorieUpload_ramdom
  var photoPath = `public/images/${req.params.nameAnnonce}-${randomName}.jpg`;
  var filename = req.files.file;

  console.log("filename",filename)

  filename.mv(photoPath, function(err) {
    if (err){
      return res.status(500).send(err);
    }
    var infofileReq = req.files
    cloudinary.v2.uploader.upload(photoPath,{folder: "image-Appart/",use_filename: true, unique_filename: false},
      function(error, result){
        if(result){
          console.log(result)
          console.log("je suis ici")

          // Delete a file.
          const fs = require('fs');
          fs.unlinkSync(photoPath)

          console.log("azertyuiop",infofileReq);
          console.log("azertyuiop",req.params.idAppart);
          appartModel.findOneAndUpdate({_id:req.params.idAppart},{
             $push: { photo: result.secure_url }
          },{new:true},function(error,findAppart){

            userModel.findOneAndUpdate({_id:req.params.idUser},{
              $push: { appartement: findAppart._id }
            },{new:true}, function(error, findUser){

              res.json({result:true, appart:findAppart, user:findUser})
            })

          });

        } else {
          console.log("Error Save Cloudinary",error)
        }
      })
  })
})


/* UPLOAD Doc IMAGE */
router.post('/upload-document/:categorie/:idUser/:idDestinataire/:sujetFichier', function(req, res, next) {



  console.log("log req.params", req.params);

  var randomName = Math.floor(Math.random() * 1000000)
  // titreappart_categorieUpload_ramdom
  var photoPath = `public/images/${req.params.categorie}-${randomName}.jpg`;
  var filename = req.files.file;

  console.log("filename",filename)

  filename.mv(photoPath, function(err) {
    if (err){
      return res.status(500).send(err);
    }
    var infofileReq = req.files
    cloudinary.v2.uploader.upload(photoPath,{folder: req.params.categorie+"/",use_filename: true},
      function(error, result){
        if(result){
          console.log(result)
          console.log("je suis ici")

          // Delete a file.
          const fs = require('fs');
          fs.unlinkSync(photoPath)

          // MAJ document

          userModel.findOne({_id:req.params.idDestinataire},function(error,findUser){
            console.log(findUser);
          })

          if (req.params.categorie == "bail") {

            userModel.findOneAndUpdate(
              {_id:req.params.idUser},
              {$push: { bail:  {timestamp: Date.now() ,url:result.secure_url, destinataire: req.params.idDestinataire} } },
              {new:true})
            .populate({path: 'bail.destinataire', populate: {path: 'destinataire', model:"users"} })
            .exec(function (err, findUser) {
              console.log(findUser);
              res.json({user:findUser})
            })

          }else if (req.params.categorie == "courrier") {

            // ajout objet du fichier
            userModel.findOneAndUpdate(
              {_id:req.params.idUser},
              {$push: { courrier:  {timestamp: Date.now() ,url:result.secure_url, destinataire: req.params.idDestinataire, objet: req.params.sujetFichier} } },
              {new:true})
            .populate({path: 'courrier.destinataire', populate: {path: 'destinataire', model:"users"} })
            .exec(function (err, findUser) {
              console.log(findUser);
              res.json({user:findUser})
            })
          }else if (req.params.categorie == "quittance") {
            userModel.findOneAndUpdate(
              {_id:req.params.idUser},
              {$push: { quittance:  {timestamp: Date.now() ,url:result.secure_url, destinataire: req.params.idDestinataire} } },
              {new:true})
            .populate({path: 'quittance.destinataire', populate: {path: 'destinataire', model:"users"} })
            .exec(function (err, findUser) {
              console.log(findUser);
              res.json({user:findUser})
            })
          }


        } else {
          console.log("Error Save Cloudinary",error)
        }
      })
  })

})


/* POST add Appart */
router.post('/add-appart', function(req, res, next) {

  console.log("req.body ADDAppARt",req);

  var newAppart = new appartModel({
    titre: req.body.titre,
    adresse: {rue:req.body.rue,codePostal:req.body.codePostal,ville:req.body.ville,pays:req.body.pays},
    desc: req.body.desc,
    surface: req.body.surface,
    prix: req.body.prix,
    categorie: req.body.categorie,
    nbmaxlocataire: req.body.nbmaxlocataire,
    meuble: req.body.meuble,
    charge: req.body.charge,
    coloc: req.body.coloc,
    idproprio: req.body.idproprio,
    idlocataire: [],
    photo: [],

  });
  newAppart.save(function(error, appart) {
    if(error) {
      console.log(error);
    }else {
      console.log(appart);
      res.json({result:true, appart:appart})
    }
  });

});



router.post('/ajoutLocataire', function(req, res, next) {

  console.log("req.body",req.body);

  var emailUser;

  if (req.body.shadow == "shadow") {
    emailUser = req.body.email
  }else {
    emailUser = "5dd3ac8e1c9d440000c08070"
  }

  userModel.findOneAndUpdate({email: req.body.email},{
    $addToSet: { appartement: req.body.idAppart }
  },{new:true},function(error,findUser){

    if (findUser != null) {

      console.log("findUser",findUser);

      appartModel.findOneAndUpdate({_id: req.body.idAppart},{
        $addToSet: { idlocataire: findUser._id }
      },{new:true},function(error,findAppart){

        console.log(findAppart);

        res.json({result:true, findAppart,findUser})

      })

    }else {
      res.json({result:false, error:"Aucun compte lié a cette email"})
    }

  });



});


// .populate({path: 'panier'})
// .exec(function (err, newUser) {
//   res.json({user:newUser})
// })


router.post('/supprLocataire', function(req, res, next) {

  console.log("req.body",req.body);

  userModel.findOneAndUpdate({email:req.body.email},{
    $pull: { appartement: req.body.idAppart }
  },{new:true},function(error,findUser){

    if (findUser != null) {

      console.log("findUser",findUser);

      appartModel.findOneAndUpdate({_id: req.body.idAppart},{
        $pull: { idlocataire: findUser._id }
      },{new:true},function(error,findAppart){
        console.log(findAppart);
        res.json({result:true, findAppart,findUser})

      })

    }else {
      res.json({result:false, error:"Aucun compte lié a cette email"})
    }

  });


});

// get info all appart
router.post('/mesAppart', function(req, res, next) {
  console.log(req.body.idproprio);
  appartModel.find({idproprio: req.body.idproprio}).populate({path: 'user'})
  .exec(function (err, findAppart) {
    res.json({result:true,findAppart})
  })

});



// get info appart
router.post('/detailAppart', function(req, res, next) {

  console.log(req.body.idappart);

  appartModel.findOne({_id:req.body.idappart})
  .populate({path: 'idlocataire'})
  .exec(function (err, findAppart) {
    console.log(findAppart);
    res.json({result:true,findAppart})
  })

});



// suppr appart
router.post('/supprAppart/:idAppart', function(req, res, next) {
  console.log("req.idAppart.idAppart",req.params.idAppart);
  appartModel.remove({_id: req.params.idAppart},function(error,findAppart){

    userModel.findAndModify({appartement:req.params.idAppart},{$pull:{appartement:req.params.idAppart}},{new:true},function(error,modifyUser){
      console.log(modifyUser);
      res.json({result:true, appart:findAppart, user:modifyUser})
    })

  })
});





// get user et de son proprio
router.post('/infoUserAndProprio', function(req, res, next) {
  console.log(req.body.idUser);
  userModel.findOne({_id:req.body.idUser})
  .populate({path: 'appartement', populate: {path: 'idproprio' } })
  .exec(function (err, findUser) {
    console.log(findUser);
    res.json({result:true, user:findUser})
  })
});


// get du proprio
router.post('/infoUser', function(req, res, next) {
  console.log(req.body.idUser);
  userModel.findOne({_id:req.body.idUser})
  .populate({path: 'bail.destinataire', populate: {path: 'destinataire', model:"users"} })
  .populate({path: 'courrier.destinataire', populate: {path: 'destinataire', model:"users"} })
  .populate({path: 'quittance.destinataire', populate: {path: 'destinataire', model:"users"} })
  .exec(function (err, findUser) {

    res.json({result:true, user:findUser})
  })
});


// get all locataire
router.post('/allLocataire', function(req, res, next) {
  console.log(req.body.idproprio);

  userModel.find({statususer:"locataire"})
  .populate({path: 'appartement'})
  .exec(function (err, findUser) {

    var newAllLocataire = [];
    // elimine les non locataire
    findUser.map(user => {
      if (user.appartement != 0) {
        newAllLocataire.push(user)
      }
    })

    newAllLocataire.filter(user => {
        return user.appartement[0].idproprio == req.body.idproprio
    })

    res.json({result:true, user: newAllLocataire})
  })
});



module.exports = router;
