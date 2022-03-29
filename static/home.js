//Get text from html
//var text = document.getElementById("test").innerHTML;
const text = document.querySelector('.test')
const strTxt = text.textContent
const splitTxt = strTxt.split("")
text.textContent = ""
var i = 0,text

function typingAnimation(){
    if(i < splitTxt.length){
        text.innerHTML += splitTxt.charAt(i)
        i++
        setTimeout(typingAnimation,50)
    }
}

typingAnimation()

