const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/userRoute')
const adminRoutes = require('./routes/adminRoutes')
const noCache = require('./middleware/noCache');
const helmet = require("helmet");
const morgan = require("morgan");


dotenv.config()
const app = express()
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(noCache)
app.use(helmet());
app.use(morgan("dev"));

app.set('view engine', 'ejs')
app.set('views', './views')

connectDB()

app.use('/user', authRoutes)
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
