let express = require('express')
let app = express()

function checkFood(req, res, next) {
    if(req.query.food) return next('food not allowed...')
    next()
}

function checkTicket(req, res, next) {
    if(!req.params.ticket) { return next('yoy dont have ticket ')}
    next()
}

function validateTicket(req, res, next) {
    let ticketHit = req.params.ticket.split('=')[1]
    let pattern = /[a-z]{6,}/
    if(!pattern.test(ticketHit)) return next('hey in valid ticket')
    next()
}

app.use(express.json())

app.get('/', function(req, res) {
    res.json({msg: 'welcome!'})
})

app.get('/qfx/:ticket', checkTicket, validateTicket, checkFood, function(req, res) {
    res.json({msg: 'welcome to qfx! '})
})

app.use((err, req, res, next) => {
    res.status(400).json({
        msg: err
    })
})

app.listen(4200, () => console.log('app lisening'))