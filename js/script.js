const Otet = [
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
  ];
  const Ttet = [
    [0, 1, 2, 11],
    [0, 10, 20, 11],
    [10, 11, 12, 1],
    [10, 11, 1, 21],
  ];
  const Ltet = [
    [0, 10, 20, 21],
    [10, 11, 12, 2],
    [0, 1, 11, 21],
    [0, 1, 2, 10],
  ];
  const Jtet = [
    [1, 11, 21, 20],
    [0, 10, 11, 12],
    [0, 10, 20, 1],
    [0, 1, 11, 21],
  ];
  const Stet = [
    [10, 11, 1, 2],
    [0, 10, 11, 21],
    [10, 11, 1, 2],
    [0, 10, 11, 21],
  ];
  const Ztet = [
    [0, 1, 11, 12],
    [1, 11, 10, 20],
    [0, 1, 11, 12],
    [1, 11, 10, 20],
  ];
  const Itet = [
    [0, 1, 2, 3],
    [2, 12, 22, 32],
    [10, 11, 12, 13],
    [1, 11, 21, 31],
  ];
  
  const container = document.getElementById("console");
  let score = 0;
  
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 10; j++) {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("id", "block-" + i + "-" + j);
      newDiv.style.top = i * 4 + "vh";
      newDiv.style.left = j * 4 + "vh";
      if (i != 20) newDiv.setAttribute("class", "no-block");
      else {
        newDiv.setAttribute("class", "stopped");
      }
      container.appendChild(newDiv);
    }
  }
  
  let squares = Array.from(document.querySelectorAll(".no-block,.stopped"));
  
  //                          GAME MUSIC
  
  let music = new Audio("audio/tetaudio.mp3");
  music.loop = true;
  const playbtn = document.getElementById("btn1");
  playbtn.addEventListener("click", tetmusic);
  const image = document.getElementsByTagName("img");
  let mplay = 0;
  
  function tetmusic() {
    if (mplay == 0) {
      music.play();
      music.volume = 0.7;
      image[0].src = "img/play.png";
      mplay = 1;
    } else {
      music.pause();
      image[0].src = "img/mute.png";
      mplay = 0;
    }
  }
  
  const tetrominoes = [Otet, Ttet, Ltet, Jtet, Stet, Ztet, Itet];
  
  //for random selection of shapes
  let currpos = 3;
  let currRot = 0;
  let random = Math.floor(Math.random() * tetrominoes.length);
  let presentshape = tetrominoes[random][currRot];
  
  const colors = [
    "#FFD500",
    "#40FF",
    "#FF8C00",
    "#C93662",
    "#FF3213",
    "#7CBB15",
    "#30ADE5",
  ];
  
  function generation() {
    presentshape.forEach((index) => {
      squares[index + currpos].style.backgroundColor = colors[random];
    });
  }
  
  generation();
  
  // deletion of blocks
  function deletion() {
    for (let i = 0; i < presentshape.length; i++) {
      squares[presentshape[i] + currpos].style.backgroundColor = "";
    }
  }
  
  function collision() {
    let num = false;
    for (let i = 0; i < presentshape.length; i++) {
      if (squares[presentshape[i] + currpos + 10].classList.contains("stopped")) {
        presentshape.forEach((index) =>
          squares[currpos + index].classList.add("stopped")
        );
        remRow();
        random = Math.floor(Math.random() * tetrominoes.length);
        presentshape = tetrominoes[random][0];
        currpos = 4;
        generation();
        endgame();
        num = true;
      }
    }
    return num;
  }
  
  // control movement of blocks
  
  function control(input) {
    if (input.key === "a" || input.key === "ArrowLeft") {
      moveLeft();
    } else if (input.key === "d" || input.key === "ArrowRight") {
      moveRight();
    } else if (input.key === "s" || input.key === "ArrowDown") {
      moveDown();
    } else if (input.key === "w" || input.key === "ArrowUp") {
      rotation();
    } else if (input.key === " ") {
      if (game === 1) {
        pausebtnimg.src = "img/play-button.png";
        game = 0;
      } else {
        pausebtnimg.src = "img/pause.png";
        game = 1;
      }
      pause();
    } else if (input.key === "m" || input.key === "M") {
      tetmusic();
    }
  }
  
  window.addEventListener("keydown", control);
  
  // TOUCH CONTROLS
  
  let touchstartX = 0,
    touchstartY = 0;
  let touchendX = 0,
    touchendY = 0;
  
  window.addEventListener("touchstart", function (event) {
    event.preventDefault();
    touchstartX = event.touches[0].clientX;
    touchstartY = event.touches[0].clientY;
  });
  
  window.addEventListener("touchend", function (event) {
    touchendX = event.changedTouches[0].clientX;
    touchendY = event.changedTouches[0].clientY;
    handle();
  });
  
  function handle() {
    let distX = Math.abs(touchstartX - touchendX);
    let distY = Math.abs(touchstartY - touchendY);
    if (!(distX <= 50 && distY <= 30)) {
      if (distX > distY) {
        if (touchstartX < touchendX)
          // right
          moveRight();
        if (touchstartX > touchendX)
          // left
          moveLeft();
      } else {
        if (touchstartY < touchendY){
          // down
          moveDown();
        }
        if (touchstartY > touchendY)
          // up
          rotation();
      }
    }
  }
  
  let game = 1;
  const pausebtn = document.getElementById("btn2");
  const pausebtnimg = document.getElementById("img2");
  pausebtn.addEventListener("click", function () {
    if (game === 1) {
      pausebtnimg.src = "img/play-button.png";
      game = 0;
    } else {
      pausebtnimg.src = "img/pause.png";
      game = 1;
    }
    pause();
  });
  
  function moveDown() {
    if (!collision()) {
      deletion();
      currpos += 10;
      generation();
    }
  }
  
  function moveLeft() {
    deletion();
    let leftmostblock = presentshape.some((index) => (currpos + index) % 10 == 0);
    let blockage = presentshape.some((index) =>
      squares[currpos + index - 1].classList.contains("stopped")
    );
    if (!leftmostblock && !blockage) {
      currpos--;
    }
    generation();
  }
  
  function moveRight() {
    deletion();
    let Rightmostblock = presentshape.some(
      (index) => (currpos + index) % 10 == 9
    );
    let blockage = presentshape.some((index) =>
      squares[currpos + index + 1].classList.contains("stopped")
    );
    if (!Rightmostblock && !blockage) {
      currpos++;
    }
    generation();
  }
  
  function rotation() {
    let nextrot = currRot + 1;
    if (nextrot >= 4) nextrot = 0;
    let nextshape = tetrominoes[random][nextrot];
    let border = nextshape.some(
      (index) => (currpos + index - 1) % 10 == 9 && (currpos + index) % 10 == 0
    );
    let norot = nextshape.some((index) =>
      squares[currpos + index].classList.contains("stopped")
    );
    if (!border && !norot) {
      deletion();
      currRot++;
      if (currRot === 4) {
        currRot = 0;
      }
      presentshape = tetrominoes[random][currRot];
      generation();
    }
  }
  
  function pause() {
    if (myInterval) {
      clearInterval(myInterval);
      myInterval = null;
    } else {
      generation();
      myInterval = setInterval(moveDown, 500);
    }
  }
  
  function endgame() {
    const block = document.querySelectorAll(".no-block");
    for (let i = 0; i <= 9; i++) {
      if (block[i].classList.contains("stopped")) {
        const heading = document.getElementById("heading");
        const scoredisp = document.getElementById("displayscore");
        heading.innerHTML = "GAME OVER";
        scoredisp.innerHTML = "SCORE: " + score;
        scoredisp.style.display = "block";
        scoredisp.style.backgroundColor = "navy";
        scoredisp.style.top = Number((window.innerHeight)/2) + 'px';
        scoredisp.style.left = Number((window.innerWidth)/3) + 'px';
        clearInterval(myInterval);
        window.removeEventListener("keydown", control);
        // window.removeEventListener("touchstart");
        // window.removeEventListener("touchend");
      }
    }
  }
  
  function remRow() {
    for (let i = 0; i < 199; i += 10) {
      let flag = true;
      for (let j = 0; j < 10; j++) {
        if (!squares[i + j].classList.contains("stopped")) {
          flag = false;
        }
      }
      if (flag) {
        score += 10;
        heading.innerHTML = "Score: " + score;
        for (let j = 0; j < 10; j++) {
          squares[i + j].classList.remove("stopped");
          squares[i + j].style.backgroundColor = "";
        }
        const squareRemoved = squares.splice(i, 10);
        squares = squareRemoved.concat(squares);
        squares.forEach((square) => container.appendChild(square));
        changeallid();
        redrawgrid();
      }
    }
  }
  
  function changeallid() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        let newid = "block-" + i + "-" + j;
        squares[i * 10 + j].id = newid;
      }
    }
  }
  
  function redrawgrid() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        const thisDiv = document.getElementById("block-" + i + "-" + j);
        thisDiv.style.top = i * 4 + "vh";
        thisDiv.style.left = j * 4 + "vh";
      }
    }
  }
  
  let myInterval = setInterval(moveDown, 500);
  