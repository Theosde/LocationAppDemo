import url from '../config';

let isLoggin = {

  islog : false,

  getResultFetchSignin:{},
  signin : (email,password,cb) => {


    fetch(url+"users/connection/signin", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Retour Fetch SignIn",data);

      if (data.error.length > 0) {
        isLoggin.getResultFetchSignin = data
        setTimeout(cb, 100);
      }else {
        localStorage.setItem("user", JSON.stringify({email:data.user.email,password:data.user.password}))
        delete data.user.salt;
        sessionStorage.setItem("user", JSON.stringify(data.user))

        isLoggin.getResultFetchSignin = data
        isLoggin.islog = true
        setTimeout(cb, 100);
      }



    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    return true

  },
  signout() {
    isLoggin.islog = false
    sessionStorage.removeItem("user")

  },
  getResultFetchSignUp:{},
  signup : (firstname,lastname,birthday,email,phone,password,statususer,cb) => {

    fetch(url+"users/connection/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstname,lastname,birthday,email,password,phone,statususer})
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Retour Fetch SignUp",data);




      if (data.result == false) {
        isLoggin.getResultFetchSignUp = data
        setTimeout(cb, 100);
      }else {

        localStorage.setItem("user", JSON.stringify({email:data.user.email,password:data.user.password}))
        delete data.user.salt;
        sessionStorage.setItem("user", JSON.stringify(data.user))

        isLoggin.islog = true


        isLoggin.getResultFetchSignUp = data
        setTimeout(cb, 100);

      }


    })
    .catch(function(error) {
      console.log('Request failed', error)
    });


  },

}

export default isLoggin;
