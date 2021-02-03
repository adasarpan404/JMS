import axios from 'axios';
import { showAlert } from './alert'
export const login = async (email, password) => {
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
                location.assign('/overview')
            }, 1500);
        }
    }
    catch (err) {
        showAlert('error', 'error')
        console.log(err)
    }


}

export const signup = async (name, email, phonenumber, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                email,
                phonenumber,
                password,
                passwordConfirm,
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'User created successfully ');
            window.setTimeout(() => {
                location.assign('/verifyOTP')
            }, 1500);
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') location.assign('/');
    } catch (err) {

        showAlert('error', 'Error logging out! Try again.');
    }
}
export const maidLogout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/maids/logout'
        });
        if ((res.data.status = 'success')) location.assign('/');
    } catch (err) {

        showAlert('error', 'Error logging out! Try again.');
    }

}

export const maidLogin = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/maids/login',
            data: {
                email,
                password
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'Login in with Maid Account is successful');
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message)
    }

}
export const maidSignUp = async (name, email, phonenumber, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'api/v1/maids/signUp',
            data: {
                name,
                email,
                phonenumber,
                password,
                passwordConfirm
            }
        })
        if (res.data.status === 'success') {
            showAlert('Sucess', 'Maid Created successfully');
            window.setTimeout(() => {
                location.assign('/verifyMaid')
            }, 1500)
        }

    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
}