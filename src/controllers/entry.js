const Entry = require('./../models/entry')
const Note = require('./../models/note')

module.exports.index = async (req, res) => {
    const entries = await Entry.find({author: req.user})
    let entry = await Entry.find({author: req.user, out: undefined})
    const notes = await Note.find({author: req.user, archive: !true})
    const globalNotes = await Note.find({archive: false})
    const myArchive = await Note.find({archive: true, author: req.user})
    const archive = await Note.find({archive: true})
    if (!entries) console.error('no entries found')
    res.render('clock/index', { entry, entries, notes, globalNotes, myArchive, archive })
} 

module.exports.clockIn = async (req, res) => {
    const entry = new Entry();
        entry.author = req.user._id
        entry.in = new Date().getTime()
        console.log(entry)
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
    console.log(req.body)
    const id = req.params.id
    const entry = await Entry.findById(id)
    entry.out = new Date().getTime()
    await entry.save()
    req.flash('success', 'successfully clocked out')
    res.redirect(`/clock/`)
} 

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await Entry.findByIdAndDelete(id)
    req.flash('success', 'successfully deleted record')
    res.redirect('/clock/')
}
