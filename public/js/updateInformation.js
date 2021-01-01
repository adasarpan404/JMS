import axios from 'axios';
import { showAlert } from './alert'

export const maidUpdatePersonalInformation = async (name, dateOfBirth, dateOfJoining, Gender, religion, languageknown, maritalstatus) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/maids/updatePersonalInformation',
            data: {
                name,
                dateOfBirth,
                dateOfJoining,
                Gender,
                religion,
                languageknown,
                maritalstatus
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'personal information added sucessfully')
            window.setTimeout(() => {
                location.assign('/contactInformation')
            }, 1500)
        }

    }
    catch (err) {
        showAlert('error', err.response.data.message)
    }
}

export const maidUpdateContactInformation = async (address1, address2, Country, City, state, zipcode) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/maids/updateContactInformation',
            data: {
                address1,
                address2,
                Country,
                City,
                state,
                zipcode,
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'contact information added successfully');
            window.setTimeout(() => {
                location.assign('/maidOverview')
            }, 1500)
        }

    }
    catch (err) {
        showAlert('error', err.response.data.message)
    }
}