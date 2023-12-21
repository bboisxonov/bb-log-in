const elLogoutBtn = document.querySelector('.logout-btn'),
    elTemplate = document.querySelector('#user-template').content,
    elUserList = document.querySelector('.user-list');

elLogoutBtn.addEventListener('click', () => {
    window.localStorage.removeItem("token")
    validateToken()
})

function validateToken() {
    let token = window.localStorage.getItem('token')
    if (!token) {
        window.location.replace('login.html')
    }
}
validateToken()

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => renderingUsers(data, elUserList))

function renderingUsers(array, node) {
    node.innerHTML = null

    let newFragment = document.createDocumentFragment()

    array.forEach(user => {

        const newTemplate = elTemplate.cloneNode(true)

        newTemplate.querySelector('.user-name').textContent = user.name
        newTemplate.querySelector('.user-userName').textContent = user.username
        newTemplate.querySelector('.user-email__address').textContent = user.email
        newTemplate.querySelector('.user-number').textContent = user.phone
        newTemplate.querySelector('.user-web').textContent = user.website
        newTemplate.querySelector('.user-btn').setAttribute("id", user.id)

        newFragment.appendChild(newTemplate)

        elUserList.appendChild(newFragment)
    });
}

elUserList.addEventListener('click', (evt) => {
    if (evt.target.matches('.user')) {
        let userID = evt.target.closest('.user-btn').id
        window.localStorage.setItem('userID', userID)
        window.location.replace('posts.html')
    }
})
