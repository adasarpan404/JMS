import axios from 'axios';
import { showAlert } from './alert';

export const forgotPassword = async (email) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword',
            data: {
                email,
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', res.data.message);
            window.setTimeout(() => {
                location.assign('/resetPassword')
            }, 1500)
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message)
    }
}
export const resetPassword = async (Otp, password, passwordConfirm) => {
    var OTP = Otp.toString();
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/resetPassword/',
            data: {
                OTP,
                password,
                passwordConfirm,
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'password changed successfully');
            window.setTimeout(() => {
                location.assign('/login')
            }, 1500)
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
}
export const forgotMaidPassword = async (email) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/maids/forgotPassword',
            data: {
                email
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', res.data.message)
            window.setTimeout(() => {
                location.assign('/resetMaidPassword')
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}
export const resetMaidPassword = async (Otp, password, passwordConfirm) => {
    var OTP = Otp.toString();
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/maids/resetPassword/',
            data: {
                OTP,
                password,
                passwordConfirm,
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'password changed successfully');
            window.setTimeout(() => {
                location.assign('/maid-login')
            }, 1500)
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
} 