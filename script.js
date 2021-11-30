const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext('2d')

c.fillStyle = 'blue'
c.fillRect(100,100,100,100)

c.moveTo(50,50)
c.lineTo(300,500)
c.strokeStyle = 'red'
c.stroke()



for (let i = 0; i<50; i++){
    const r = 40
    const x = Math.random()*(window.innerWidth+2*r)-r
    const y = Math.random()*(window.innerWidth+2*r)-r
    c.beginPath()
    c.arc(x,y,r,0,Math.PI*2,false)
    c.strokeStyle = 'green'
    c.stroke()
}

