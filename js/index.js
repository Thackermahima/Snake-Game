let inputDir = {x: 0,y: 0};
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13,y: 15}
]
food = {x: 6,y: 7};


// Game functions 
function main(ctime) {
 window.requestAnimationFrame(main);
 if((ctime - lastPaintTime)/1000 < 1/speed){
     return;
 }
 lastPaintTime = ctime;
 gameEngine();
}
   
function isCollide(snake){
   //if you bump into yourself
   for(let i = 1; i < snakeArr.length; i++){
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
           return true;
       }
    }
      //if you bump into wall
       if(snake[0].x >= 18 || snake[0].x <=0  || snake[0].y >=18 || snake[0].y <= 0 ){
           return true;
       }
      
       //if you bump into baby
       if (snakeArr[0].x == babyArr[0].x && snakeArr[0].y == babyArr[0].y) {
        return true;
       }
       return false;
    }
      
function gameEngine(){
    //part - 1 : Updating the snake array & food 
    if(isCollide(snakeArr)){
       inputDir =  {x: 0,y: 0};
       alert("Game Over. Press any key to play again!");
       snakeArr = [{x: 13,y: 15}];
       score = 0;
    }

     //if you have eaten the food,increment the score and regenerate the score
      if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){ 
        score += 1;
        if(score>hiscoreval){
         hiscoreval = score;
         localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
         hiscoreBox.innerHTML = "HighScore: " + hiscoreval
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
     
    }
    
    //Moving the snake 
      for (let i = snakeArr.length - 2; i>=0; i--){
          snakeArr[i+1] = {...snakeArr[i]};
      }
         snakeArr[0].x += inputDir.x;
         snakeArr[0].y += inputDir.y;

    //part - 2 : Display the snake ,food and baby
    //Dispaly the snake
         board.innerHTML = "";
        snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x; 
        if(index === 0){
        snakeElement.classList.add('head');
        }else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Dispaly the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x; 
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore:"+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = {x: 0,y: 1} //start game
   switch (e.key) {
       case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
       break;

    case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
           break;

    case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
           break;

    case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
          break;
       default:
           break;
   }
})
