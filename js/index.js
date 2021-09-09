let inputDir = {x: 0,y: 0};
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13,y: 15}
]
food = {x: 6,y: 7};
// Game functions 
function main(ctime) {
 window.requestAnimationFrame(main);
 //console.log(ctime);
 if((ctime - lastPaintTime)/1000 < 1/speed){
     return;
 }
 lastPaintTime = ctime;
 gameEngine();
}
function gameEngine(){
    //part - 1 : Updating the snake array & food 
   
    if(isCollide(snakeArr)){
       inputDir =  {x: 0,y: 0};
       alert("Game Over. Press any key to play again!");
       
    }

    //part - 2 : Display the snake and food 
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
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = {x: 0,y: 1} //start game
   switch (e.key) {
       case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
       break;

    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
           break;

    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
           break;

    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
          break;
       default:
           break;
   }
})