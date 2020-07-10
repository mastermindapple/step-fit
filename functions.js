var database = firebase.database();
const exUser = localStorage.getItem("step_fit_user_name_2277");

if(exUser !== null){
    location.replace("home.html")
}

document.getElementById("sign-up-btn").addEventListener('click',(e) => {
    e.preventDefault();
    var userId = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("password-confirm").value;

    var regex = /\W/g;
    var result = userId.match(regex);

    if(!userId || !password || !passwordConfirm){
        alert("Please fill in all the fields")
    }
    else if(result){
        alert("Your Username cannot contain special characters");
    }

    else if(password !== passwordConfirm){
        alert("Your passwords do not match")
    }

    else{
        alert("Please wait while we create your account");

        //Reading the data from the database.
        var profiles;
        database.ref("/Users/").on("value",snapshot=>{
        profiles = snapshot.val();
      })

      //Processing data
      function check(){
        profiles = Object.keys(profiles);
        if(profiles.includes(userId)){
            document.write("<h1>This username is already taken</h1>");
            setTimeout(function(){
                location.reload();
            },2000);
        }
        else{
            window.localStorage.setItem("step_fit_user_name_2277",userId);
            database.ref("/Users/"+userId).set({
                password: password,
                minimum: 100000000000000000000000000000000000000000000000000000000000000000000000000000,
                workout_history: 0,
                total_workout_time: 0,
                personal_best: 0,
                personal_best_rounds: 0,
                total_rounds: 0,
                total_workouts: 0,
                total_cals: 0,
                multiplayer: false
            });
        
            setTimeout(function(){
                location.replace("weight.html");
            },3000);
         }
      }
      setTimeout(check,3000);
    }
})







