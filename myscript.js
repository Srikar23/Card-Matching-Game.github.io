var min,sec,timeId,prevCardId,cardsMatchedCount = 0;
var playerName={name :"Player"} 

//var images ={"java":"http://is.am/4eux","python":"http://is.am/4eun","js":"http://is.am/4eum","cpp":"http://is.am/4euw \
//","java1":"http://is.am/4eux","python1":"http://is.am/4eun","js1":"http://is.am/4eum","cpp1":"http://is.am/4euw"}


function start(){
    //asking player name
    playerName.name = prompt("Please enter your name","player")
    if(playerName.name == null)
        playerName.name = "player1"

    min = 0,sec=0;
    //updating the timer on webpage
    timeId = setInterval(setTime,1000);

    //picking random cards and assigning to the image cards
    files = ["cpp","cpp1","python1","python","java","java1","js1","js"]
    var i,n=8;
    for(i=1;i<=8;i++){
        var ind = randomNumber(0, n-1)
        document.getElementById(i+"").id=files[ind];
        files =files.slice(ind + 1, n).concat(files.slice(0, ind))
        n-=1;
    }
}

//setting time on the webpage
function setTime()
{
    sec+=1;
    //updating the minute value after 60 sec
    if(sec == 60)
    {
        min+=1;
        sec = 0;
    }
    if(min > 2)
    {
        finish("Sorry "+playerName.name.toUpperCase()+" TimeOut!!",4000);
    }

    document.getElementById("minute").textContent ="0"+min+"";
    document.getElementById("seconds").textContent = sec>9?sec+"":"0"+sec;
}

//generating a random int in given range
function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

//flipping the selected card acc to the respective conditions
function flip(card_id)
{
    var image = "images/"+card_id+".jpg";
    var card_obj = document.getElementById(card_id);    
    
    if(prevCardId == null)
    {
        prevCardId = card_id;
        card_obj.setAttribute("src",image);
    }
    //match found
    else if(prevCardId == card_id+"1" || prevCardId+"1" == card_id)
    {
        //flipping the card and onclick is made null
        card_obj.setAttribute("src",image);
        card_obj.onclick = null;
        document.getElementById(prevCardId).onclick = null;
        //no.of matches found
        cardsMatchedCount++;

        prevCardId = null;
        //All cards are matched
        if(cardsMatchedCount == 4)
        {
            var timetaken = 60*(document.getElementById('minute').textContent);
            timetaken = parseInt(document.getElementById('seconds').textContent)+timetaken;
            //     totalTime-takenTime
            var iq = (180-timetaken)*(100/171);

            finish(playerName.name.toUpperCase()+" your IQ "+iq,10000)
        }
    }
    else
    {   //reealing the card
        card_obj.setAttribute("src",image);
        setTimeout(card_obj.setAttribute("src","images/cover.jpg"),4000);

        var prev_card = document.getElementById(prevCardId);
        prev_card.setAttribute("src","images/cover.jpg");
        prevCardId = null;
    }
}

//reloading the current window
function reload()
{
    location.reload()
}

//displaying result
function finish(msg,reloadTime)
{
    clearInterval(timeId);
    document.getElementById("result").innerHTML=msg;
    setTimeout(reload,reloadTime);
}
