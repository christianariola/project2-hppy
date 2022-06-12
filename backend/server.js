const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 

app.get('/', (req, res) => {
    res.send('Welcome to Hppy')
})

// Routes
app.use('/api/employees', require('./routes/employeeRoutes'))

app.use(errorHandler)