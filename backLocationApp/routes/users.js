var express = require('express');
var router = express.Router();


var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");



var userModel = require('../models/usersModel')



router.get('/', function(req, res, next) {

  console.log("sdqqdsqdqsd");

});


router.post('/connection/signin', function(req, res, next) {

  console.log(req.body);

  // userModel.findOne({email:req.body.email},function(error,findUser){
  //   if (findUser != null) {
  //
  //     if (req.body.password.length == 44) {
  //       var mdp = req.body.password
  //     }else {
  //       var mdp = SHA256(req.body.password + findUser.salt).toString(encBase64);
  //     }
  //
  //     if (findUser.password === mdp ) {
  //       console.log("password ok");
  //
  //       console.log(findUser);
  //
  //       res.json({user: findUser, result:true, error:""})
  //
  //     }else {
  //       console.log("password fail");
  //       res.json({result:false, error:"password incorrect"})
  //     }
  //
  //   }else {
  //     res.json({result:false, error:"email incorrect"})
  //   }
  // });

  userModel.findOne({email:req.body.email})
  .populate({path: 'appartement', populate: {path: 'idproprio', model:"users"} })
  .exec(function (err, findUser) {
    console.log("findUser",findUser);
    if (findUser != null) {

      if (req.body.password.length == 44) {
        var mdp = req.body.password
      }else {
        var mdp = SHA256(req.body.password + findUser.salt).toString(encBase64);
      }

      if (findUser.password === mdp ) {
        console.log("password ok");

        res.json({user: findUser, result:true, error:""})

      }else {
        console.log("password fail");
        res.json({result:false, error:"password incorrect"})
      }

    }else {
      res.json({result:false, error:"email incorrect"})
    }
  })


});


router.post('/connection/signup', function(req, res, next) {

  var myPassword = req.body.password;
  var salt = uid2(32);

  var myPasswordHacke = SHA256(myPassword + salt).toString(encBase64);

  console.log(req.body);

  userModel.findOne({email:req.body.email},function(error,findUser){
    if (findUser) {
      res.json({result:false, error:"cette email est déja liée a un compte"})
    }else {

      var newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        password: myPasswordHacke,
        salt: salt,
        statususer: req.body.statususer,
        appartement: []

      });
      newUser.save(function(error, user) {
        if(error) {
          console.log(error);
        }else {
          console.log(user);
          res.json({user: user})
        }
      });
    }

  });

});

module.exports = router;
