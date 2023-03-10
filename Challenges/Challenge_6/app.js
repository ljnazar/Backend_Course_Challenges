const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const exphbs = require('express-handlebars');
const authRouter = require('./src/routes/auth');
const { createHash } = require('./src/utils/index');
const env = require('dotenv');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

const mongoStore = MongoStore.create({
    mongoUrl: 'mongodb+srv://ljnazar:elmo1546@ecommerce.2qxtdjo.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 150
});

app.use(session({
    store: mongoStore,
    secret: createHash('secretoConHashRandom'),
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
server.on('error', error => console.log(error));