
const Otet = [
    [0,1,10,11],
    [0,1,10,11],
    [0,1,10,11],
    [0,1,10,11]
];
const Ttet = [
    [0,1,2,11],
    [0,10,20,11],
    [10,11,12,1],
    [10,11,1,21]
];
const Ltet = [
    [0,10,20,21],
    [10,11,12,2],
    [0,1,11,21],
    [0,1,2,10]
];
const Jtet = [
    [1,11,21,20],
    [0,10,11,12],
    [0,10,20,1],
    [0,1,11,21]
];
const Stet = [
    [10,11,1,2],
    [0,10,11,21],
    [10,11,1,2],
    [0,10,11,21]
];
const Ztet = [
    [0,1,11,12],
    [1,11,10,20],
    [0,1,11,12],
    [1,11,10,20]
];
const Itet = [
    [0,1,2,3],
    [2,12,22,32],
    [10,11,12,13],
    [1,11,21,31]
];




for(let i=0;i<21;i++){
    for(let j=0;j<10;j++){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id","block-"+i+"-"+j);
        newDiv.style.top = i*4 + 'vh';
        newDiv.style.left = j*4 + 'vh';
        if(i!=20)
        newDiv.setAttribute("class","no-block");
        else{
            newDiv.setAttribute("class","border");
            newDiv.classList.add('stopped');
        }
        const addNode = document.getElementById("console");
        addNode.appendChild(newDiv);
    }
}
function tetmusic(){
let music = new Audio('audio/tetaudio.mp3');

// let bodySelector = document.querySelector('body');
// bodySelector.addEventListener('load', function() {
    music.play();
//})
}

    const squares = document.querySelectorAll('.no-block,.stopped');

    const tetrominoes = [Otet, Ttet, Ltet, Jtet, Stet, Ztet, Itet];

   //for random selection of shapes
   let currpos = 3;
   let currRot = 0;
   let random = Math.floor(Math.random()*tetrominoes.length);
   let presentshape = tetrominoes[random][currRot];
  
    
   function generation(){ 
        presentshape.forEach(index=>{
            squares[index+currpos].style.backgroundColor = 'bisque';
        });
    }

    generation();
    
    // deletion of blocks
    function deletion(){
        for(let i=0;i<presentshape.length;i++){
            squares[presentshape[i]+currpos].style.backgroundColor = '';
        }
    }

    function collision(){
        for(let i=0;i<presentshape.length;i++){
            if(squares[presentshape[i]+currpos+10].classList.contains('stopped')){
                presentshape.forEach(index => squares[currpos + index].classList.add('stopped'));
                random = Math.floor(Math.random()*tetrominoes.length);
                presentshape = tetrominoes[random][0];
                currpos = 4;
                generation();
                endgame();
            }
        }
    }
  

    // control movement of blocks

    function control(input){
        if(input==='a'||input==='ArrowLeft'){
            moveLeft();
        }
        else if(input==='d'||input==='ArrowRight'){
            moveRight();
        }
        else if(input==='s'||input==='ArrowDown'){
            moveDown();
        }
        else if(input=== 'w'||input==='ArrowUp'){
            rotation();
        }
        else if(input === ' '){
            pause();
        }

    }
    window.addEventListener('keydown',function(event){
         control(event.key);
        });
    
    
    function moveDown(){
        deletion();
        currpos+=10;
        generation();
        collision();
    }
    
   
    function moveLeft(){
        deletion();
        let leftmostblock = presentshape.some( index =>(currpos+index) % 10 == 0);
        if(!leftmostblock){
            currpos--;
        }
        generation();   
    }

    function moveRight(){
        deletion();
        let Rightmostblock = presentshape.some(index =>(currpos+index) % 10 == 9);
        
        if(!Rightmostblock){
            currpos++;
        }
        generation();   
    }
   
    function rotation(){
        deletion();
        currRot++;
        if(currRot === 4){
            currRot = 0;
        }
        presentshape = tetrominoes[random][currRot];
        generation();
     }
    
  

    function pause(){
        if(myInterval){
            clearInterval(myInterval);
            myInterval= null;
        }
        else{
            generation();
            myInterval = setInterval(moveDown,500);
        }
}

    function endgame(){
        const block = document.querySelectorAll('.no-block');
        for(let i=0;i<=9;i++){
            if(block[i].classList.contains('stopped')){
                const heading = document.getElementById('heading');
                heading.innerHTML = 'GAME OVER';
                clearInterval(myInterval);
            }
        }
    }

    let myInterval = setInterval(moveDown,500);


