const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/userRoute')
const adminRoutes = require('./routes/adminRoutes')


dotenv.config()
const app = express()
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ❗ Place THIS here (before routes)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});


app.set('view engine', 'ejs')
app.set('views', './views')

// connect db
connectDB()

// routes
app.use('/user', authRoutes)
app.use('/admin', adminRoutes)

// basic welcome route
app.get('/', (req, res) => {
    res.render('user/landingPage')
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on 
    http://localhost:5000/,
    http://localhost:5000/admin/login`,

))
