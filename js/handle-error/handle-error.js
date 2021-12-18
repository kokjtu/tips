let err, result

[err, result] = await await handlerRequest(request(a))
if (err) {
    console.error(`Error ret1::`, err)
}

const handlerRequest = promise => {
    return promise.then(data => ([undefined, data]))
    .catch(err => ([err, undefined]))
}