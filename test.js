var API = "http://localhost:3000/info";
// Open Button //

function open() {
  var loginBtn = document.querySelector(".login-btn");
  loginBtn.onclick = function () {
    {
      var form = document.querySelector(".form-login-main");
      form.classList.replace("appear", "hidden");
      
      // var thoatBtn = React.createElement(
      //   "button",
      //   { className: "exitBtn appear" },
      //   "Thoát"
      // );

      var thoatBtn = document.createElement("button");
      thoatBtn.className = "exitBtn appear";
      thoatBtn.textContent = "Thoát";
      var newPage = document.createElement("h1");
      newPage.innerHTML = "TRANG CHỦ";
      newPage.className = "appear";
      
      document.getElementById("container-main-page").appendChild(newPage);
      document.getElementById("container-main-page").appendChild(thoatBtn);
      
      var exitPlace = document.querySelector(".exit-btn-place");
      thoatBtn.onclick = function (e) {       
        form.classList.replace("hidden", "appear");
        document.getElementById("container-main-page").classList.replace("appear", "hidden");
      };
      //ReactDOM.render(thoatBtn, exitPlace);
      exitPlace.onsubmit = (e) => e.preventDefault();
    }
  };
}
var formLogin = document.querySelector(".form-login-main");
var formRegister = document.querySelector(".form-register-main");


//kiểm tra className
function hasClass(element,name){
  var a = element.className.split(" ");
  for (var i = 0 ; i < a.length; i++) {
    if(a[i]==name) return true;
  }
  return false;
}

//nút đổi trang
function changePage(){
  var changePage = document.querySelectorAll(".change-page-btn");
  for(var i=0;i<changePage.length;i++){
    changePage[i].onclick = (e)=>{
      if(hasClass(formLogin,"appear"))
        formLogin.classList.replace("appear", "hidden");
      else if(hasClass(formLogin,"hidden"))
        formLogin.classList.replace("hidden", "appear");
      if(hasClass(formRegister,"hidden"))
        formRegister.classList.replace("hidden", "appear");
      else if(hasClass(formRegister,"appear"))
      formRegister.classList.replace("appear", "hidden");
    }
  }
}

//open();

//render by ReactDOM.render()
// var listSV = document.querySelector('#list_student');
// const SV = React.createElement('li',{
//    className: 'SV1',
// },'Hoàng');
// ReactDOM.render(SV,listSV);
// var formElement = document.querySelector('.form');
// console.log(formElement);

// Validator-dang nhap
function Validator(formSelector) {
  var formElement = document.querySelector(formSelector);
  var formInputElement = {};
  var inputElements = formElement.querySelectorAll(".input-validator");
  formElement.onsubmit = (e) => {
    e.preventDefault();
    for (var input of inputElements) {
      formInputElement[input.name] = input.value;
    }
    fetch(API)
      .then((res) => res.json())
      .then((databases) => {
        const equal = databases.find((data) => {
          if (
            data.name == formInputElement.name &&
            data.age == formInputElement.age &&
            data.id == formInputElement.id
          )
            return true;
          return false;
        });

        if (equal) open();
        else alert("dang nhap that bai");
      });
  };
}

//đăng ký
function POST(data,cb){
  var response  = {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
    };
  fetch(API,response)
    .then((res) => res.json())
    .then(cb)
}

function addDataRegister(){
  var regisForm = document.querySelector(".form-register");
  regisForm.onsubmit = (e) => {
    e.preventDefault();
    var id = document.querySelector("#id-register").value;
    var name = document.querySelector("#name-register").value;
    var age = document.querySelector("#age-register").value;
    var regisData ={
      id:id,
      name: name,
      age: age
    }
    POST(regisData);
  }
}


function start() {
  //open();
  Validator(".validator");
  changePage();
  addDataRegister();
}
start();
// var formElement = document.querySelector(".form");
// var formInputElement = {};
// var inputElements = formElement.querySelectorAll("[name]");
// for (var input of inputElements) {
//   console.log(input.name);
// }




      
