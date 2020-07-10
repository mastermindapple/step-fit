const database = firebase.database();
const username = localStorage.getItem("step_fit_user_name_2277");
if(username === null){
  location.replace("login.html");
}
else{

function display(){
  if(username === ""){
    document.write("Please Check your Network And reload the page to Try Again");
  }
  else{
 document.getElementById("name-display").innerHTML = (username+"'s ");
 document.getElementById("rest").innerHTML = ("Home");
}
  var workout = document.getElementById("workout");
  var stats = document.getElementById("stats");
  var settings = document.getElementById("settings");
  var acheivments = document.getElementById("acheivments");

  workout.addEventListener("click", (e)=>{
    e.preventDefault();
    location.replace("workouts.html");
  })
  stats.addEventListener("click", (e)=>{
    e.preventDefault();
    location.replace("stats.html");
  })

  settings.addEventListener("click", (e)=>{
    e.preventDefault();
    location.replace("opponent.html");
  })
  acheivments.addEventListener("click", (e)=>{
    e.preventDefault();
    location.replace("acheivments.html");
  })

}

/*
  var signOutBtn = document.getElementById("sign-out");
  signOutBtn.addEventListener("click",(e) =>{
    e.preventDefault();
    localStorage.removeItem("step_fit_user_name_2277");
  })
  */
display();
}