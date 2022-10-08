
const Otet = [
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
    [0,1,11,12],
    [0,1,2,10]
];
const Jtet = [
    [1,11,21,20],
    [0,10,11,12],
    [0,10,20,1],
    [0,1,2,12]
];
const Stet = [
    [10,11,1,2],
    [0,10,11,21],
    [2,12,11,21]
];
const Ztet = [
    [0,1,11,12],
    [1,11,10,20]
];
const Itet = [
    [0,1,2,3],
    [0,10,20,30]
];

let grid1 = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];


for(let i=0;i<21;i++){
    for(let j=0;j<10;j++){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id","block-"+i+"-"+j);
        newDiv.style.top = i*4 + 'vh';
        newDiv.style.left = j*4 + 'vh';
        if(grid1[i][j]==1 && i!=20)
        newDiv.setAttribute("class","block");
        else if(i!=20)
        newDiv.setAttribute("class","no-block");
        else
        newDiv.setAttribute("class","border");
        const addNode = document.getElementById("console");
        addNode.appendChild(newDiv);
    }
}

   const tetrominoes = [Otet, Ttet, Ltet, Jtet, Stet, Ztet, Itet]

   //for random selection of shapes
   let randomshape = Math.floor(Math.random()*tetrominoes.length)
   let presentshape = tetrominoes[randomshape][0];
   
   //generation of blocks

   function generation(xoffset){ 
      for(let i=0;i<presentshape.length;i++){
        let x = Math.floor(presentshape[i]/10);
        let y = presentshape[i]%10;
        const element = document.getElementById('block-'+(x+xoffset)+'-'+y);
        // console.log('block-'+ x +'-'+ y);
        element.style.backgroundColor = 'bisque';
      }
    }

    // deletion of blocks

    function deletion(xoffset){ 
         for(let i=0;i<presentshape.length;i++){
           let x = Math.floor(presentshape[i]/10);
           let y = presentshape[i]%10;
           const element = document.getElementById('block-'+(x+xoffset)+'-'+y);
           element.style.backgroundColor = '';
        }
    }
    
    let pos = 0;
    function moveDown(){
        deletion(pos);
        pos++;
        generation(pos);
    }
  
    setInterval(moveDown,500);
      