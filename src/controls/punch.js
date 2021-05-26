exports.in = (req, res, next) => {
    res.status(200).json({ status: 'success', message: `clocked in`})
    next()
}
exports.out = (req, res, next) => {
    res.status(200).json({ status: 'success', message: `clocked out`})
    next()
}
