const Express = require('express');
const bodyParser = require('body-parser');
//test
const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});

const login = require('./routes/login'); // 
app.use('/login', login);