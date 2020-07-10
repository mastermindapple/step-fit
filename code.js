var para = document.getElementById("countdown-container");
var count = 5;
function onload(){
    var inter = setInterval(function(){
        para.innerHTML = count;
        count--;
    },1000);
     function start(){
         clearInterval(inter);
         para.innerHTML = ("Workout Starting Now");
     }
     function change(){
         location.replace("workout.html");
     }
     setTimeout(start, 6000);
     setTimeout(change, 7000);

}