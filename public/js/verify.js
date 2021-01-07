import axios from 'axios';
import { showAlert } from './alert'

export const verifyOTP = async (OTP) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/verify',
            data: {
                OTP,
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
        showAlert('error', err.response.data.message)
    }
}

export const resendTo = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/users/resendOTP'
        });
        if (res.data.status === ' success ') location.assign('/');
    }
    catch (err) {
        showAlert('error', 'error! while sending message')
    }
}

export const verifyOTPMaid = async (OTP) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/maids/verify',
            data: {
                OTP,
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


export const resendToMaid = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/maids/resendOTP'
        });
        if (res.data.status === ' success ') location.assign('/');
    }
    catch (err) {
        showAlert('error', err.data.message)
    }
}