var database = firebase.database();
const username = localStorage.getItem("step_fit_user_name_2277");
var button = document.getElementById("start-workout-btn");
if(username === null){
window.location.replace("login.html");
}
else{
function display(){
var usernameDelCheck;
database.ref("/Users/").on("value",snapshot=>{
    usernameDelCheck = snapshot.val();
})
setTimeout(function(){
    usernameDelCheck = Object.keys(usernameDelCheck);
    if(usernameDelCheck.includes(username)){

    }
    else{
        alert("Your account has been deleted by the Step Fit team.");
        localStorage.removeItem("step_fit_user_name_2277");
        localStorage.removeItem("timeline");
        localStorage.removeItem("total_time");
        localStorage.removeItem("weight_input");
        localStorage.removeItem("workout_date");
        localStorage.removeItem("workout_number");
        location.replace("signup.html");
    }
},3000)

document.getElementById("name-display").innerHTML = ("Hi,");
document.getElementById("name-disp").innerHTML = (username);
}
var signOut = document.getElementById("sign-out");
button.addEventListener("click",(e)=>{
    e.preventDefault();
    location.replace("converter.html");
})
signOut.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.clear();
    location.reload();
});
display();
}
submitStuckWorkouts();
function submitStuckWorkouts(){
    var workoutNumber = localStorage.getItem("workout_number");
    var timeline = localStorage.getItem("timeline");
    var workoutDate = localStorage.getItem("workout_date");
    var totalTime = localStorage.getItem("total_time");  
    totalTime = parseInt(totalTime)
    var startTime = localStorage.getItem("start_time");
    var endTime = localStorage.getItem("end_time"); 
    var data;

    database.ref("/Users/"+username+"/").on('value',snapshot=>{
        data = snapshot.val();
    })
    
    setTimeout(function(){
    if(workoutNumber !== null){
        timeline = timeline.split(",");
        data.workout_history = data.workout_history.toString().split(",");
        data.workout_history.push(totalTime.toString())
        console.log(data.workout_history)
    database.ref("/Users/"+username+"/Workouts/"+workoutDate+"/"+workoutNumber+"/").update({
        total_time: totalTime,
        timeline: timeline,
        average_per_round: getAvg(),
        calories_burnt: Math.round(data.weight / 15.8 * (parseInt(totalTime)/60)),
        start_time: startTime,
        end_time: endTime
    });
        database.ref("/Users/"+username+"/workout_details").update({
        last_workout: workoutNumber,
        last_workout_date: workoutDate,
        });              
        if(Math.min(timeline)<data.minimum){
            database.ref("/Users/"+username+"/").update({
                minimum : Math.min(timeline)
            })
        }
        if(totalTime > data.personal_best){
            database.ref("/Users/"+username+"/").update({
                personal_best: totalTime
            })
        }
        if(timeline.length > data.personal_best_rounds){
            database.ref("/Users/"+username+"/").update({
                personal_best_rounds: timeline.length
            })
        }
        database.ref("/Users/"+username+"/").update({
            total_cals: data.total_cals + Math.round(data.weight / 15.8 * (parseInt(totalTime)/60)),
            total_rounds: data.total_rounds + timeline.length,
            total_workout_time: data.total_workout_time + totalTime,
            total_workouts: data.total_workouts + 1,
            workout_history: (data.workout_history).join(",")
        })
        localStorage.removeItem("timeline");
        localStorage.removeItem("total_time");
        localStorage.removeItem("workout_date");
        localStorage.removeItem("workout_number");
    }
},3000);
function getAvg(){
            var sum = 0;
            for(var i=0; i<timeline.length; i++){
                sum += parseInt(timeline[i]);
            }
            return Math.floor((sum/timeline.length)/60)+","+Math.round((sum/timeline.length) % 60);
        }
}

document.getElementById("name-disp").onclick = function(){
    location.replace("stats.html")
}
submitStuckWorkouts();