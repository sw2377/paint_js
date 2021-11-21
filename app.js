const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const randomColor = document.getElementById("randomColor");
const colorPick = document.getElementById("colorPick");
const colorPicker = colorPick.querySelector("input");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true; 
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // painting이 true일때와 false 일때가 다름.
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x,y); // 선 시작 좌표 → 경로를 만든다.
    } else {
        ctx.lineTo(x,y); // 선 끝 좌료
        ctx.stroke(); // 선 그리기 → 그린다.
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function randomColorClick(){
    const color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    randomColor.style.backgroundColor = color;
    randomColor.firstElementChild.style.color = "white";
}

function colorPickClick(){ 
    colorPicker.click();
}

function changeColor(){
    const color = colorPicker.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorPick.style.background = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function clearCanvas(){
    ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href= image;
    link.download = "PaintJS🎨";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(randomColor){
    randomColor.addEventListener("click", randomColorClick);
}

if(colorPick){
    colorPick.addEventListener("click", colorPickClick);
    colorPicker.addEventListener("change", changeColor);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(clear){
    clear.addEventListener("click", clearCanvas);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}