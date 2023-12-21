const elCommentList = document.querySelector('.comments-list');
let commentsTemplate = document.querySelector('#comments-template').content,
    elBackBtn = document.querySelector('.back-btn');

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


let postID = window.localStorage.getItem('postID')

fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
        let filteredComments = data.filter(comment => comment.postId == postID)
        renderingComments(filteredComments, elCommentList)
    })

function renderingComments(array, node) {

    array.forEach(comment => {
        let newComment = commentsTemplate.cloneNode(true)

        newComment.querySelector('.comments-name').textContent = comment.name
        newComment.querySelector('.comments-email').textContent = comment.email
        newComment.querySelector('.comments-body').textContent = comment.body

        node.appendChild(newComment)
    });
}