var min,sec,timeId,name;
var images ={"java":"http://is.am/4eux","python":"http://is.am/4eun","js":"http://is.am/4eum","cpp":"http://is.am/4euw \
","java1":"http://is.am/4eux","python1":"http://is.am/4eun","js1":"http://is.am/4eum","cpp1":"http://is.am/4euw"}

function start(){
    setTimeout(name =prompt("Please enter your name", "Player"),2000);
    min = 0,sec=0;
    timeId = setInterval(time,1000);
    files = ["cpp","cpp1","python1","python","java","java1","js1","js"]
    var i,n=8;
    for(i=1;i<=8;i++){
        var ind = randomNumber(0, n-1)
        document.getElementById(i+"").id=files[ind];
        files =files.slice(ind + 1, n).concat(files.slice(0, ind))
        n-=1;
    }
}

function time()
{
    sec+=1;
    if(sec == 60)
    {
        min+=1;
        sec = 0;
    }
    document.getElementById("time").innerHTML=min+":"+sec;
}
function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

var prev;
var count = 0;
function flip(card_id)
{
    var image = images[card_id+""];
    var card_obj = document.getElementById(card_id);    
    
    if(prev == null)
    {
        prev = card_id;
        card_obj.setAttribute("src",image);
    }
    //match found
    else if(prev == card_id+"1" || prev+"1" == card_id)
    {
        //flipping the card and onclick is made null
        card_obj.setAttribute("src",image);
        card_obj.onclick = null;
        document.getElementById(prev).onclick = null;
        //no.of matches found
        count++;

        prev = null;
        //All cards are matched
        if(count == 4)
        {
            clearInterval(timeId);
            document.getElementById("result").innerHTML= name.toUpperCase()+" WoW!!";
            setTimeout(reload,30000);
        }
    }
    else
    {
        var prev_card = document.getElementById(prev);
        prev_card.setAttribute("src","http://is.am/4euk");
        prev = null;
    }
}
function reload()
{
    location.reload()
}