const express = require('express');
const csrf = require('csurf');
const bodyParser = require('body-parser')
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(csrf());

app.get('/', (req, res) => {
    res.send(`<form action="/transferMoney" method="post">
    <input name="amount" placeholder="Enter Money Amount to transfer" />
    <input type="hidden" name="to" value="123456" />
    <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
    <input type="submit" value="submit" />
    </form>`)
})

app.post('/transferMoney', (req, res) => {
    res.send(`Money ${req.body.amount} transfered succefully to ${req.body.to}`)
})

app.listen(3000, () => console.log('app listening on 3000'))