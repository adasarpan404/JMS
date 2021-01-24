import axios from 'axios';
import { showAlert } from './alert';
const Stripe = require('stripe')
const stripe = Stripe(pk_test_51I475HIdMjerK5lwrVjdR8S82kcuXg4UebgvVlfboxNuBhbjpWrugcu7iq85vLo7C7WF5Nx3gUj1SHRtcWrKp29b00vx5pSced)

export const bookTour = async maidId => {
    try {
        console.log(maidId)
        const session = await axios(`/api/v1/booking/checkout-session/${maidId}`)

        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err)
    }
}