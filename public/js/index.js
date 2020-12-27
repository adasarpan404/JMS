import axios from 'axios';
import '@babel/polyfill';



const loginForm = document.querySelector('.login-form')

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        console.log('arpan')
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password)
    })
}
const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password,
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'Logged In Successfully');
            window.setTimeout(() => {
                location.assign('/')
            }, 1500);
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message)
    }
}


const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000)
}

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};