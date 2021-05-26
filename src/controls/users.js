exports.create = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Create a new user with the id of ${req.params.id}` })
    next()
}

exports.readAll = (req, res, next) => {
    res.status(200).json
    ({ status: `Retrieve all data from users database`, 
    results: ['users from a database'.split(' ')] })
    next()
}

exports.read = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Fetch user with the id of /${req.params.id}` })
    next()
}

exports.update = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Edit the user with the id of ${req.params.id}` })
    next()
}

exports.delete = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Delete a new user with the id of ${req.params.id}` })
    next()
}

