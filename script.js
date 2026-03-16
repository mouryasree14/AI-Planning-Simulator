const gridSize = 10
let grid=[]
let start=null
let goal=null
let mode="obstacle"

const gridElement=document.getElementById("grid")

function createGrid(){

grid=[]
gridElement.innerHTML=""

for(let r=0;r<gridSize;r++){

let row=[]

for(let c=0;c<gridSize;c++){

let cell=document.createElement("div")
cell.classList.add("cell")

cell.dataset.row=r
cell.dataset.col=c

cell.addEventListener("click",cellClick)

gridElement.appendChild(cell)

row.push(0)
}

grid.push(row)
}

}

function setMode(m){
mode=m
}

function cellClick(){

let r=this.dataset.row
let c=this.dataset.col

if(mode==="start"){

document.querySelector(".start")?.classList.remove("start")

this.classList.add("start")

start=[+r,+c]

}

else if(mode==="goal"){

document.querySelector(".goal")?.classList.remove("goal")

this.classList.add("goal")

goal=[+r,+c]

}

else{

this.classList.toggle("obstacle")

grid[r][c]=grid[r][c]===1?0:1

}

}

function generatePlan(){

if(!start || !goal){

alert("Place start and goal first")

return

}

let queue=[[...start,[]]]

let visited=new Set()

while(queue.length){

let [r,c,path]=queue.shift()

if(r===goal[0] && c===goal[1]){

showPath(path)

document.getElementById("actions").innerText=path.join(" → ")

document.getElementById("cost").innerText=path.length

return

}

let key=r+","+c

if(visited.has(key)) continue

visited.add(key)

let moves=[

[r+1,c,"Down"],
[r-1,c,"Up"],
[r,c+1,"Right"],
[r,c-1,"Left"]

]

for(let [nr,nc,move] of moves){

if(nr>=0 && nc>=0 && nr<gridSize && nc<gridSize){

if(grid[nr][nc]!==1){

queue.push([nr,nc,[...path,move]])

}

}

}

}

document.getElementById("actions").innerText="No path found"

document.getElementById("cost").innerText="∞"

}

function showPath(path){

let r=start[0]

let c=start[1]

for(let move of path){

if(move==="Down") r++

if(move==="Up") r--

if(move==="Right") c++

if(move==="Left") c--

let cell=document.querySelector(`[data-row='${r}'][data-col='${c}']`)

if(!cell.classList.contains("goal"))

cell.classList.add("path")

}

}

function resetGrid(){

start=null

goal=null

createGrid()

document.getElementById("actions").innerText="No plan generated yet."

document.getElementById("cost").innerText="0"

}

createGrid()