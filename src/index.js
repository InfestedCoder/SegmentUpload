import React from 'react';
import ReactDOM from 'react-dom/client';
import UploadImageToS3 from "./UploadImageToS3";

let canvas = document.getElementById("canvas")
canvas.height = 500
canvas.width = 500
let ctx = canvas.getContext("2d")
ctx.lineWidth = 5

let prevX = null
let prevY = null

let draw = false

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", function(e){
    if(prevX == null || prevY == null || !draw){
        prevX = e.offsetX
        prevY = e.offsetY
        return
    }

    let mouseX = e.offsetX
    let mouseY = e.offsetY
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()

    prevX = e.offsetX
    prevY = e.offsetY
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UploadImageToS3 />
    </React.StrictMode>
);