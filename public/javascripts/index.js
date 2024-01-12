const messageList = document.querySelector(".message-list")
const dialog = document.querySelector('dialog')

dialog.addEventListener('click', clickHandler)
messageList.addEventListener('click', clickHandler)

function clickHandler(e) {
    console.log(e)
    switch(e.target.name) {
        case 'cancel': 
            dialog.close()
            removeText()
        break

        case 'delete':
            dialog.showModal()
            // Li elements
            const id = e.target.parentNode.getAttribute('data-id')
            const children = e.target.parentNode.children
            const title = children[0].textContent
            const author = children[1].textContent
            const date = children[2].textContent
            const text = children[3].textContent
            
            updateDialog(id, author, date, text)
            
            
        break;

        default:
            console.log('Event error no handler for it')
        
    }
}

function updateDialog(id, author, date, text) {
    
    const formContent = document.querySelector('.content')

    const children = formContent.childNodes
    const idEl = children[1]
    const authorEl = children[2]
    const dateEl = children[3]
    const messageEl = children[4]

    const authorText = document.createTextNode(author)
    const dateText = document.createTextNode(date)
    const messageText = document.createTextNode(text)

    idEl.value = id
    authorEl.append(authorText)
    dateEl.append(dateText)
    messageEl.append(messageText)
}

// Removes the text of certain elements in the dialog form
function removeText() {
    const formContent = document.querySelector('.content')
    const children = formContent.children
    // const idEl = children[1]
    const authorEl = children[2]
    const dateEl = children[3]
    const messageEl = children[4]
    removeTextNode(authorEl)
    removeTextNode(dateEl)
    removeTextNode(messageEl) 
}

// Checks the children of element and if there is node text remove it
function removeTextNode(el) {
    el.childNodes.forEach((val) => {
        if(val.nodeType === Node.TEXT_NODE) {
            val.remove()
        }
    })
}
