const renderEdit = type => {
    if (type !== 'done') {
        document.querySelectorAll(`#${type} button.render`)
        .forEach(button => button.addEventListener('click', e => {
            e.preventDefault()
            const id = `#${e.path[1].id}`
            const div = document.querySelector(id)
            const title = div.children[0].innerText
            let message
            if (div.children[4]) message = div.children[4].innerText
            if (div.children[7]) message = div.children[7].innerText
            const newDiv = `
            <input type="text" id="title" name="title" value="${title}"placeholder="edit">
            <select name="type">
                <option value="note" ${type === 'note' ? 'selected' : ''}>Note</option>
                <option value="todo" ${type === 'todo' ? 'selected' : ''}>To Do</option>
                <option value="done" ${type === 'done' ? 'selected' : ''}>Done</option>
            </select>
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
    else if (type === 'done'){
        document.querySelectorAll('#done button.render')
        .forEach(button => button.addEventListener('click', e => {
            e.preventDefault()
            const id = `#${e.path[1].id}`
            const div = document.querySelector(id)
            const title = div.children[0].innerText
            const newDiv = `
            <input type="text" id="title" name="title" value="${title}"placeholder="edit">
            <button>Submit</button>
            <textarea id="${id}_message" name="message" ></textarea>
            <button>Submit</button>
            `
            div.innerHTML = newDiv
            const textarea = document.querySelector(`${id} textarea`)
            if (message !== '')
                textarea.innerText = div.children[7].innerText
            else textarea.placeholder = 'provide some more detail (optional)'
        }))
    }
}
renderEdit('done')
renderEdit('note')
renderEdit('todo')