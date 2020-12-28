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
                location.assign('/')
            }, 1500);
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message)
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
                location.assign('/')
            }, 1500);
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
}