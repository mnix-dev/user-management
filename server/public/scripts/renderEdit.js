const renderEdit = type => {
    document.querySelectorAll(`#${type} button.render`)
    .forEach(button => button.addEventListener('click', e => {
        e.preventDefault()
        const id = `#${e.path[1].id}`
        const div = document.querySelector(id)
        const title = div.children[0].innerText
        const msg = document.querySelector(`${id} p`)
        let message
        if (msg) message = msg.innerText
        
        const newDiv = `
        <input type="text" id="title" name="title" value="${title}"placeholder="edit">
        <select name="type">
            <option value="note" ${type === 'note' ? 'selected' : ''}>Note</option>
            <option value="todo" ${type === 'todo' ? 'selected' : ''}>To Do</option>
            <option value="done" ${type === 'done' ? 'selected' : ''}>Done</option>
        </select>
        <br />
        <textarea id="${id}_message" name="message" ></textarea>
        <button>Submit</button>
        `
        div.innerHTML = newDiv
        const textarea = document.querySelector(`${id} textarea`)
        if (message)
            textarea.innerText = message
        else textarea.placeholder = 'provide some more detail (optional)'
    }))
}
renderEdit('done')
renderEdit('note')
renderEdit('todo')