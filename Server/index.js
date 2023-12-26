const express = require("express")

const port = 3500

const app = express()

app.get('/',(req, res) => {
    res.status(200).json({msg: 'success'})
})

app.listen(port, ()=> console.log('Server started at 3500...'))