const Note = require('../models/note')
const Clock = require('../models/clock')

module.exports.create = async (req, res) => {
    const entry = await Clock.findById(req.params.entryId)
    const note = new Note(req.body)
    note.archive = false
    note.author = req.user._id
    note.createdAt = new Date().getTime()
    note.createdBy = req.user.username
    entry.notes.push(note)
    await note.save()
    await entry.save()
    req.flash('success', 'Added new note!')
    res.redirect(`/clock/${entry._id}`)
}

module.exports.edit = async(req, res) => {
    const { id,  noteId } = req.params
    const note = await Note.findByIdAndUpdate(noteId, req.body)
    if (note.type === 'done')
    note.type = 'todo'
    note.lastEdit = new Date().getTime()
    note.lastEditBy = req.user.username
    await note.save()
    res.redirect(`/clock/${id ? id : ''}`)
}

module.exports.finish = async(req, res) => {
    const { id, noteId } = req.params
    const note = await Note.findById(noteId)
    note.lastEdit = new Date().getTime()
    note.lastEditBy = req.user.username
    note.type = 'done'
    await note.save()
    res.redirect(`/clock/${id ? id : ''}`)
}

module.exports.archive = async(req, res) => {
    const { id, noteId } = req.params
    if (id) await Clock.findByIdAndUpdate(id, {$pull: { notes: noteId }})
    const note = await Note.findById(noteId)
    note.archive = true
    note.archiveAt = new Date().getTime()
    await note.save()
    res.redirect(`/clock/${id ? id : ''}`)
}

module.exports.restore = async(req, res) => {
    const { id, noteId } = req.params
    if (id) await Clock.findByIdAndUpdate(id, {$push: { notes: noteId }})
    const note = await Note.findById(noteId)
    note.archive = false
    await note.save()
    res.redirect(`/clock/${id ? id : ''}`)
}

module.exports.flag = async(req, res) => {
    const { id, noteId } = req.params
    const note = await Note.findById(noteId)
    note.lastEdit = new Date().getTime()
    note.lastEditBy = req.user.username
    note.type = 'todo'
    await note.save()
    res.redirect(`/clock/${id ? id : ''}`)
}

module.exports.delete = async(req, res) => {
    const { id, noteId } = req.params
    if (id) await Clock.findByIdAndUpdate(id, {$pull: { notes: noteId }})
    await Note.findByIdAndDelete(noteId)
    req.flash('success', 'successfully removed note')
    res.redirect(`/clock/${id ? id : ''}`)
}

module.exports.read = async(req, res) => {
    const notes = await Note.find({archive: false})
    res.send(notes)
}