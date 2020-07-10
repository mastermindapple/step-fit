const database = firebase.database();
const user = localStorage.getItem("step_fit_user_name_2277"); 
var dad = new Date();
var singleUnit = dad.getDay()+","+dad.getDate()+","+dad.getMonth()+","+dad.getFullYear();
var startTime = dad.getHours()+","+dad.getMinutes()+","+dad.getSeconds();
var endTime;
var resId = Math.random().toString().split(".");
resId = resId[1];

var timeline = [];
var rounds = 0;
var seconds = 0;
var minutes = 0;
var currSec = 0;
var currMin = 0;
var totalSeconds = 0;
var netCheck = 0;

if(!user){
    alert("Please Go To the Login/Signup Page to Proceed");
    location.replace("login.html");
}

var clock = setInterval(function(){
    seconds++;
    currSec++;

    if(currSec === 60){
        currSec = 0;
        currMin++;
    }
    if(seconds === 60){
        seconds = 0;
        minutes++;
    }

    totalSeconds++;
},1000);

function increment(){
    rounds++;
    timeline.push(currMin+","+currSec);
    currSec = 0;
    currMin = 0;

    document.getElementById("increment-btn").style.transform = "translateY(10px)";
    setTimeout(function(){
      document.getElementById("increment-btn").style.transform = "translateY(-10px)";
    },50);

    if(timeline.length > 10){
       document.getElementById("history").innerHTML = ("");
       for(var i=timeline.length-1; i>i-10; i--){
        var roundNumber = i+1;
        var newEle = document.createElement("p");
        newEle.innerHTML = ("Round "+roundNumber+": "+timeline[i].split(",")[0]+" Minutes  "+timeline[i].split(",")[1]+" Seconds <br>");
        document.getElementById("history").appendChild(newEle);
    }
    }
}

function display(){
    document.getElementById("currTime").innerHTML =
     (currMin+" Minutes"+"  "+currSec+" Seconds");

     document.getElementById("rounds").innerHTML =
     (rounds);


    // Displaying the total Time
    document.getElementById("total").innerHTML = (minutes+" Minutes   "+
    seconds+" Seconds");
    
}
var dispInt = setInterval(display,10);

document.getElementById("end").addEventListener("click",(e) => {
e.preventDefault();
endTime = new Date().getHours()+","+new Date().getMinutes()+","+new Date().getSeconds();
clearInterval(dispInt);
clearInterval(clock);
localStorage.setItem("workout_res_status","done")
rounds++;
timeline.push(currMin+","+currSec);
document.write("<center><h1>Please Wait for your stats</h1></center>");
for(var i=0; i<timeline.length; i++){
    timeline[i] = (parseInt(timeline[i].split(",")[0])*60)+parseInt(timeline[i].split(",")[1]);
}
setInterval(function(){
    database.ref("/net").on("value",snapshot=>{
        netCheck = snapshot.val();
    })
},10)
var checkNet = setInterval(function(){
    if(netCheck !== 0){
        netCheck = 0;
        var replacement = setTimeout(function(){location.replace("result.html")},2000)
    }
    else{
        alert("Your internet connection is very slow. We are saving your workout on your computer. It will be sent to our servers the next time you login.");
        localStorage.setItem("workout_number",resId);
        localStorage.setItem("workout_date",singleUnit);
        localStorage.setItem("total_time",totalSeconds);
        localStorage.setItem("timeline",timeline);
        localStorage.setItem("start_time",startTime);
        localStorage.setItem("end_time",endTime);
        location.replace("home.html");
        clearInterval(checkNet);
        clearTimeout(replacement)
    }
},4000);
database.ref("/Users/"+user+"/Workouts/"+singleUnit+"/"+resId).update({
    total_time: totalSeconds,
    timeline: timeline,
    start_time: startTime,
    end_time: endTime
 });
 database.ref("/Users/"+user+"/workout_details").update({
     last_workout: resId,
     last_workout_date: singleUnit
  });
})

    