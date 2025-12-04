const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser")
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const noCache = require('./middleware/noCache');
const morgan = require("morgan");


dotenv.config()
const app = express()
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(noCache)
app.use(morgan("dev"));

app.set('view engine', 'ejs')
app.set('views', './views')

connectDB()

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => {
    res.render('user/landingPage')
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running at:`);
    console.log(`http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/admin/login`);
});
