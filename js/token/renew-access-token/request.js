const axios = require('axios')

const instance = axios.create({
    baseURL: '/api', //https://localhost:3000/api
    timeout: 3*1000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// xử lý data trước khi xuống server
instance.interceptors.request.use(async (config) => {
    console.log('truoc khi request:::')
    if (config.url.indexOf('/login') >= 0 || config.url.indexOf('refreshToken') >= 0) {
        // nhung route khong can check token
        return response
    }
    config.headers['X-Token'] = await instance.getLocalAccessToken()
    return config
}, err => {
    return Promise.reject(err)
})

// xử lý data sau khi response từ server 
instance.interceptors.response.use(async (response) => {
    console.log('sau khi response:::')
    const config = response.config
    if (config.url.indexOf('/login') >= 0 || config.url.indexOf('refreshToken') >= 0) {
        // nhung route khong can check token
        return response
    }
    const {code, msg} = response.data
    if (code && code === 401) {
        if (msg && msg == 'jwt expired'){
            console.log('Truong hop token het han:::', msg)
            //step 1: get token from refreshToken
            const {elements: {accessToken}} = await refreshToken()
            if (accessToken) {
                //step 2: 
                config.headers['X-Token'] = accessToken
                //step 3:
                await instance.setLocalAccessToken(accessToken)

                return instance(config)
            }
        }
    }
    return response
}, err => {
    return Promise.reject(err)
})

// FUNCTION
async function login() {
    return (await instance.get('/login')).data
}

async function refreshToken() {
    return (await instance.get('/refreshToken')).data
}

async function getUsers() {
    return (await instance.get('/users')).data
}

// login
const {status, elements: {accessToken}} = await login()
if (status === 'success') {
    // set token vs timeExpired localStorage
    await instance.setLocalAccessToken(accessToken)
}
// end login

// get users
const {status, elements} = await getUsers()
if (status === 'success') {
    console.table(elements)
}
// end get users

instance.setLocalAccessToken = async (token) => {
    window.localStorage.setItem('accessToken', token)
}

instance.getLocalAccessToken = async ({token, timeExpired}) => {
    return window.localStorage.getItem('accessToken') ? window.localStorage.getItem('accessToken') : null
}
// END FUNCTION