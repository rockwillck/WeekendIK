const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 1024

const endpoints = [[200, 800], [800, 200]]
window.addEventListener(("mousemove"), (e) => {
    rect = canvas.getBoundingClientRect();
    endpoints[1] = [(e.clientX - rect.left)/canvas.clientWidth*canvas.width, (e.clientY - rect.top)/canvas.clientHeight*canvas.height]
})

const segments = [500, 600]
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(endpoints[0][0], endpoints[0][1])
    ctx.lineTo(endpoints[1][0], endpoints[1][1])
    ctx.closePath()
    ctx.stroke()

    baseAngle = Math.atan2(endpoints[1][1] - endpoints[0][1], endpoints[1][0] - endpoints[0][0])
    
    fullLength = Math.sqrt((endpoints[1][0] - endpoints[0][0])**2 + (endpoints[1][1] - endpoints[0][1])**2)
    addAngle = Math.acos((segments[0]**2 + fullLength**2 - segments[1]**2)/(2*segments[0]*fullLength))

    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(endpoints[0][0], endpoints[0][1])
    ctx.lineTo(endpoints[0][0] + segments[0]*Math.cos(baseAngle + addAngle), endpoints[0][1] + segments[0]*Math.sin(baseAngle + addAngle))
    ctx.lineTo(endpoints[1][0], endpoints[1][1])
    ctx.stroke()
}
animate()