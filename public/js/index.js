
import '@babel/polyfill';
import { login, signup, logout, maidLogin, maidSignUp } from './login';


const loginForm = document.querySelector('.login-form');
const signForm = document.querySelector('.signup-form');
const logOut = document.getElementById('logout');
const MaidLogin = document.querySelector('.maid-login-form');
const MaidSignUp = document.querySelector('.maid-signup-form')
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password)
    })
}

if (signForm) {
    signForm.addEventListener('submit', e => {
        e.preventDefault();
        var user_name = [];
        user_name[0] = document.getElementById('firstname').value;
        user_name[1] = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('phonenumber').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        var name = user_name.join(" ");
        console.log(name, number, password, passwordConfirm)
        signup(name, email, number, password, passwordConfirm)
    })
}

if (logOut) {
    logOut.addEventListener('click', logout);
}

if (MaidLogin) {
    MaidLogin.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        maidLogin(email, password);
    })
}

if (MaidSignUp) {
    MaidSignUp.addEventListener('submit', e => {
        e.preventDefault();
        var user_name = [];
        user_name[0] = document.getElementById('firstname').value;
        user_name[1] = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        var number = document.getElementById('phonenumber').value;
        var password = document.getElementById('password').value;
        var passwordConfirm = document.getElementById('passwordConfirm').value;
        var name = user_name.join(" ");
        maidSignUp(name, email, number, password, passwordConfirm);
    })
}


