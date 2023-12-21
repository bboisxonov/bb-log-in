// {
//     "email": "eve.holt@reqres.in",
//         "password": "cityslicka"
// }

const elForm = document.querySelector('.site-form'),
    elEmailInput = document.querySelector('.login-email'),
    elPasswordInput = document.querySelector('.login-password'),
    elSubmitBtn = document.querySelector('.login-submit_btn');



elForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    let emailValue = elEmailInput.value,
        passwordValue = elPasswordInput.value;

    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                window.localStorage.setItem('token', data.token)
                window.location.replace('index.html')
            }
        })

})