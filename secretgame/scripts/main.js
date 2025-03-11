let Clicks = 0
function buttonClick(){
    Clicks += 1
    document.getElementById("count").innerHTML = ['Clicks:',Clicks].join(' ');
}