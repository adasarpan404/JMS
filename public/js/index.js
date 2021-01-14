
import '@babel/polyfill';
import { login, signup, logout, maidLogin, maidSignUp, maidLogout } from './login';
import { maidUpdatePersonalInformation, maidUpdateContactInformation } from './updateInformation';
import { forgotPassword, resetPassword, forgotMaidPassword, resetMaidPassword } from './forgotReset';
import { verifyOTP, resendTo, verifyOTPMaid, resendToMaid } from './verify';
const Login__l = document.getElementById('login')
const maidlogin__1 = document.getElementById('maid-login')
const loginForm = document.querySelector('.login-form');
const signForm = document.querySelector('.signup-form');
const logOut = document.getElementById('logout');
const MaidLogin = document.querySelector('.maid-login-form');
const MaidSignUp = document.querySelector('.maid-signup-form');
const MaidLogout = document.querySelector('.maidLogout');
const personalForm = document.querySelector('.personal-form');
const contactForm = document.querySelector('.contact-form');
const forgotform = document.querySelector('.forgot-form');
const resetform = document.querySelector('.Reset-form');
const forgotMaidform = document.querySelector('.forgot-maid-form');
const resetMaidform = document.querySelector('.Reset-maid-form');
const verifyform = document.querySelector('.verify-form');
const resendCode = document.getElementById('resendCode');
const verifyMaid = document.querySelector('.verify-maid-form')
const resendCodeM = document.getElementById('resendCodeMaid')
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

if (MaidLogout) {
    MaidLogout.addEventListener('click', maidLogout)
}


if (personalForm) {
    personalForm.addEventListener('submit', e => {
        e.preventDefault();
        var user_name = [];
        user_name[0] = document.getElementById('inputtext1').value;
        user_name[1] = document.getElementById('inputtext2').value;
        var dateOfBirth = document.getElementById('inputnumber1').value;
        var dateOfJoining = document.getElementById('inputnumber2').value;
        var Gender = document.getElementById('gender').value;
        var religion = document.getElementById('religion').value;
        var language = document.getElementById('language').value;
        var maritalStatus = document.getElementById('maritialStatus').value;
        var name = user_name.join(" ");
        maidUpdatePersonalInformation(name, dateOfBirth, dateOfJoining, Gender, religion, language, maritalStatus)
    })
}
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        var address1 = document.getElementById('address1').value;
        var address2 = document.getElementById('address2').value;
        var country = document.getElementById('country').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var zipcode = document.getElementById('zipcode').value;
        maidUpdateContactInformation(address1, address2, country, city, state, zipcode);
    })
}

if (forgotform) {
    forgotform.addEventListener('submit', e => {
        e.preventDefault();
        var email = document.getElementById('email').value;
        forgotPassword(email);
    })
}

if (resetform) {
    resetform.addEventListener('submit', e => {
        e.preventDefault();
        var OTP = document.getElementById('inputnumber').value;
        var password = document.getElementById('inputpassword1').value;
        var passwordConfirm = document.getElementById('inputpassword2').value;
        resetPassword(OTP, password, passwordConfirm);
    })
}

if (forgotMaidform) {
    forgotMaidform.addEventListener('submit', e => {

        e.preventDefault();
        var Email = document.getElementById('email').value;
        forgotMaidPassword(Email);
    })
}

if (resetMaidform) {
    resetMaidform.addEventListener('submit', e => {
        e.preventDefault();
        var OTP = document.getElementById('inputnumber').value;
        var password = document.getElementById('inputpassword1').value;
        var passwordConfirm = document.getElementById('inputpassword2').value;
        resetMaidPassword(OTP, password, passwordConfirm)

    })
}

if (verifyform) {
    verifyform.addEventListener('submit', e => {
        e.preventDefault();
        var OTP = document.getElementById('inputnumber').value;
        verifyOTP(OTP);
    })
}

if (resendCode) {
    resendCode.addEventListener('click', resendTo);
}
if (verifyMaid) {
    verifyMaid.addEventListener('submit', e => {
        e.preventDefault();
        var OTP = document.getElementById('inputnumber').value;
        verifyOTPMaid(OTP);
    })
}
if (resendCodeM) {
    resendCodeM.addEventListener('click', resendToMaid)
}

if (Login__l) {
    Login__l.addEventListener('click', e => {
        e.preventDefault();
        location.assign('/login')
    })
}
if (maidlogin__1) {
    maidlogin__1.addEventListener('click', e => {
        e.preventDefault();
        location.assign('/maid-login')
    })
}