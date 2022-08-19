const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const authRoutes = require('./auth')
const cors = require('cors')

const port = process.env.PORT || 5001
const app = express()

// database connection 
const dbURI = 'mongodb+srv://jacobegood:jacobegood@goodcluster.czb5vne.mongodb.net/movie-mania'
mongoose.connect(dbURI,)
    .then(console.log('app is connect to mongoDB'))
    .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// routes 
app.use(authRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
);
  

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})