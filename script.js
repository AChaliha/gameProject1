let score=0;
cross=true;
audio=new Audio('gameMusic.mp3');
audiogo=new Audio('gameOver2.mp3');
setTimeout(()=>
{
  audio.play();
},2000)
document.onkeydown=function(e)//on pressing a key from the keyboard,the event should be triggered. In our case,the ninja should jump
{
    
    if(e.key=='ArrowUp')
    {
        dino=document.querySelector(".dino");
        dino.classList.add('animateNinja');
        setTimeout(()=>{
            dino.classList.remove('animateNinja');
        },700)
    }
    if(e.key=='ArrowRight')
    {
        dino=document.querySelector(".dino");
        dinoX=parseInt(getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX+112+'px';
    }
    if(e.key=='ArrowLeft')
    {
        dino=document.querySelector(".dino");
        dinoX=parseInt(getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX-112+'px';
    }
}
setInterval(()=>
{
    dino=document.querySelector(".dino");
    gameOver=document.querySelector(".gameOver");
    obstacle=document.querySelector(".obstacle");
    dx=parseInt(getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(getComputedStyle(dino,null).getPropertyValue('top'));

    ox=parseInt(getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(getComputedStyle(obstacle,null).getPropertyValue('top'));

    let offsetX=Math.abs(dx-ox);
    let offsetY=Math.abs(dy-oy);
    if(offsetX<120&&offsetY<100)
    {
        gameOver.style.visibility='visible';
        obstacle.classList.remove('animateObstacle');
        audiogo.play();
        setTimeout(()=>
        {
           
            audio.pause();
            
        },1000);
        setTimeout(()=>
        {
           
            audiogo.pause();
            
        },2000);
    }
    else if(offsetX<145&&cross)
    {
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>
        {
           cross=true;
        },1000);
        setTimeout(()=>
        {
            aniDur=parseFloat(getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur=aniDur-0.3;
            obstacle.style.animationDuration=newDur+'s';
        },500)
    }

},100);
function updateScore(score)
{
    const scoreCount = document.querySelector('.scoreCount');
    scoreCount.innerHTML="Your score is:"+score;
}
/*As the score keeps on increasing, let us increase the obstacle speed*/