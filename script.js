const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 1024

// the endpoints of our triangle (excluding the joint in the middle)
// more endpoints could be added with some modifications
const endpoints = [[200, 800], [800, 200]]

// this is a mouse handler (it tracks where the second joint should be)
// it is unrelated to the IK code
window.addEventListener(("mousemove"), (e) => {
    rect = canvas.getBoundingClientRect();
    endpoints[1] = [(e.clientX - rect.left)/canvas.clientWidth*canvas.width, (e.clientY - rect.top)/canvas.clientHeight*canvas.height]
})

// the length of your segments
// the sum of these two values MUST exceed the distance between the two endpoints
// on that note, if you visit the demo (or open this file in a browser) and move your mouse to the top right corner, you'll see your IK fail. this is why.
const segments = [500, 600]
function animate() {
    // rendering code, unrelated to IK
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(endpoints[0][0], endpoints[0][1])
    ctx.lineTo(endpoints[1][0], endpoints[1][1])
    ctx.closePath()
    ctx.stroke()

    // calculates the angle defined by the x-axis and the line defined by the two endpoints
    baseAngle = Math.atan2(endpoints[1][1] - endpoints[0][1], endpoints[1][0] - endpoints[0][0])
    
    // full length of the segment
    fullLength = Math.sqrt((endpoints[1][0] - endpoints[0][0])**2 + (endpoints[1][1] - endpoints[0][1])**2)

    // this uses the SSS theorem (no, not the one about congruence) to find the angle between the original line (between endpoints) and one of the segments.
    addAngle = Math.acos((segments[0]**2 + fullLength**2 - segments[1]**2)/(2*segments[0]*fullLength))

    // now we just draw a line from the first endpoint, with that angle we computed above, of length equal to the length defined in the segments variable
    // then just connect back to the second endpoint and boom! done!
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(endpoints[0][0], endpoints[0][1])
    ctx.lineTo(endpoints[0][0] + segments[0]*Math.cos(baseAngle + addAngle), endpoints[0][1] + segments[0]*Math.sin(baseAngle + addAngle))
    ctx.lineTo(endpoints[1][0], endpoints[1][1])
    ctx.stroke()
}
animate()