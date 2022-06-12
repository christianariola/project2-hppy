const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 

app.get('/', (req, res) => {
    res.send('Welcome to Hppy')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)