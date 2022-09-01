import React, { useEffect, useState } from 'react'

function Counter({value}) {
    
    const [prog, setprog] = useState(value);
   
    const changeDisplayText =  (number)=> {
        let counti = document.getElementById("counti");
        switch(true) {
          case (number <= 49):
            counti.style.color = "white";
            break;
          case (number >=50 && number<70):
counti.style.color = "khaki";
            break;
          case (number >=70 && number<80):
            counti.style.color = "gold";
            counti.style.playState = "paused";
            break;
          case (number >=80 && number<90):
            counti.style.color = "gold";
            counti.style.playState = "running";
            counti.style.animationName = "shake";
            counti.style.filter = "blur(0px)";
            break
          case (number >=90 && number<95):
            counti.style.color = "orange";
            counti.style.animationName = "shake-with-blur";
            break;
          case (number >=95 && number<100):
            counti.style.color = "orangered";
            counti.style.playState = "running";
            counti.style.animationName = "shake-with-lots-of-blur";
            break;
          case (number ===100):
            counti.style.color = "red";
            counti.style.playState = "paused";
            counti.style.animationName = "shake";
            counti.style.filter = "blur(0px)";
            break;
        }
    }
    
 
     const  play100PercentSound=() =>{
        var limitSound = new Audio('sounds/100PercentSound.mp3');
        limitSound.volume = 0.05;
        limitSound.currentTime = 0.1;
        limitSound.play();
        setTimeout(function() {
          limitSound.pause();
        }, 1100);
      }

     const  hitLimit = () =>{
        play100PercentSound;

        setTimeout(function() {
          document.body.style.backgroundImage = "url('gif/mobFreakoutLonger.gif')";
        }, 1100);
      }
      
      const handleChange  = ()=>{
        console.log("hi");
   
        var counterSound = new Audio('sounds/counterChangeBleep.mp3');
        counterSound.volume = 1;
        counterSound.play();
        changeDisplayText(prog);
        if(prog === 100){
            hitLimit;
          while (prog!=0){
         setprog(prog-1);
          }
          document.body.style.backgroundImage = "none";
      }
    }

 
  return (
   <div style  ={{position : "absolute" , top: "2rem" , left : "50vw" , fontColor : "white", fontSize : 20, fontFamily : "Mob Psycho 100"}}>
   <div id = "counti" onLoad={handleChange}>{Number(value)}<span>%</span></div>
   
   </div>
  )
}


export default Counter