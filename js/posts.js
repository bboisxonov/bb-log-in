// POSTS

let elBackBtn = document.querySelector('.back-btn'),
    elPostList = document.querySelector('.post-list'),
    postsTemplate = document.querySelector('#posts-template').content;

function validateToken() {
    let token = window.localStorage.getItem('token')
    if (!token) {
        window.location.replace('login.html')

    }
}
validateToken()

// function reloadReaction() {
//     if (window.location.reload()) {
//         window.location.replace('index.html')
//     }
// }
// reloadReaction()

elBackBtn.addEventListener('click', () => {
    if (window.location.pathname === "/posts.html") {
        window.location.replace('index.html')
    } else if (window.location.pathname === "/comments.html") {
        window.location.replace('posts.html')
    }
})

let userID = window.localStorage.getItem('userID')

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        let filteredPosts = data.filter(post => post.userId == userID)
        renderingPosts(filteredPosts, elPostList)
    })

function renderingPosts(array, node) {
    node.innerHTML = null
    array.forEach(post => {
        let newPostTemplate = postsTemplate.cloneNode(true)
        newPostTemplate.querySelector('.post-title').textContent = post.title
        newPostTemplate.querySelector('.post-body').textContent = post.body
        newPostTemplate.querySelector('.comments').setAttribute("id", post.id)

        node.appendChild(newPostTemplate)
    });
}

elPostList.addEventListener('click', (evt) => {
    if (evt.target.matches('.comments')) {
        let postID = evt.target.closest('.comments').id
        window.localStorage.setItem("postID", postID)
        window.location.replace('comments.html')
    }
})