// to find the players searching for multiplayer.
var database = firebase.database();
var users;
var usernames;
var searchers = [];
database.ref("/Users/").on("value",snapshot=>{
    users = snapshot.val();
})
setTimeout(function(){
    for(var i=0; i<users.length; i++){
        if(users[usernames[i]].searching ==  true){
            searchers.push(usernames[i]);
        }
    }
},3000);
//////////////////////////
var activeUser = localStorage.getItem("step_fit_user_name_2277");
document.getElementById("target").addEventListener("click",(e)=>{
    e.preventDefault();
    database.ref("/Users/"+activeUser).update({
        searching: true
    });
})
//To find the best competition.
function getBestMatch(){
    searchers = searchers.splice(searchers.findIndex(activeUser),1);
    var bestMatch;
    var timeDifs = [];
    var leastTime = 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    for(var i=0; i<usernames.length; i++){
        timeDifs.push(Math.abs(users[searchers[i]].workout_time - users[activeUser].workout_time));
    }
    for(var i=0; i<timeDifs.length; i++){
        if(timeDifs[i] < leastTime){
            leastTime = timeDifs[i];
        }
    }
    bestMatch = searchers[timeDifs.findIndex(leastTime)];
    return bestMatch;
}
var bestMatch = getBestMatch();
