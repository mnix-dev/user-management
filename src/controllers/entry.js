const Entry = require('./../models/entry')
const Note = require('./../models/note')

module.exports.index = async (req, res) => {
    const entries = await Entry.find({author: req.user})
    const notes = await Note.find({author: req.user, archive: !true})
    const globalNotes = await Note.find({archive: false})
    if (!entries) console.error('no entries found')
    res.render('clock/index', { entries, notes, globalNotes })
} 

module.exports.clockIn = async (req, res) => {
    const entry = new Entry();
        entry.author = req.user._id
        entry.in = new Date().getTime();
    await entry.save();
    req.flash('success', 'successfully clocked in')
    res.redirect(`/clock/${entry._id}`)
} 

module.exports.read = async (req, res) => {
    const entry = await Entry.findById(req.params.id).populate({
        path: 'notes' }).populate({path: 'archive' })
    res.render('clock/in', { entry })
}

module.exports.clockOut = async (req, res) => {
    const id = req.params.id
    const entry = await Entry.findById(id)
    if (entry.out) this.index(null, res)
    entry.out = new Date().getTime()
    await entry.save()
    req.flash('success', 'successfully clocked out')
    res.redirect(`/clock/`)
} 

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await Entry.findByIdAndDelete(id)
    req.flash('success', 'successfully deleted record')
    res.redirect('/clock')
}
