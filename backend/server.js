const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000

const app = express()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 

app.get('/', (req, res) => {
    res.send('Welcome to Hppy')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))