const express = require('express')
const app = express()
const {verifyToken, signAccessToken, signRefreshToken} = require('./init_jwt')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/// API
api.get('/api/users', verifyToken, (req, res)=>{
    return res.status(200).json({
        status: 'success',
        elements: [{
            name: 'name1',
        }, 
        {
            name: 'name2',
        }]
    })
})

api.get('/api/login', async (req, res)=>{
    return res.status(200).json({
        status: 'success',
        elements: {
            accessToken: await signAccessToken(),
        }
    })
})

api.get('/api/refreshToken', async (req, res)=>{
    return res.status(200).json({
        status: 'success',
        elements: {
            accessToken: await signAccessToken()
        }
    })
})
/// END API

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})