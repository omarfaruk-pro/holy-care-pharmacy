// components/CheckoutForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import useCart from '../hooks/useCart';
import { useMutation } from '@tanstack/react-query';

export default function CheckoutForm({ clientSecret, amount, user, userId, cartItems, refetchCartPage }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { refetchCart } = useCart();

    const { mutateAsync: clearCart, isLoading: isClearing } = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.delete(`/cart/${userId}/clear`);
            return res.data;
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                },
            },
        });



        if (error) {
            setErrors(error.message);
            setProcessing(false);
        } else {
            setProcessing(false);
            if (paymentIntent.status === 'succeeded') {
                setSuccess('Payment successful!');
                try {
                    const response = await axiosSecure.post('/orders', {
                        userId,
                        email: user?.email,
                        name: user?.displayName,
                        amount: amount / 100,
                        paymentIntentId: paymentIntent.id,
                        status: 'pending',
                        // date: new Date().toISOString(),
                        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
                        cartItems
                    });
                    clearCart();
                    refetchCart();
                    refetchCartPage();
                    navigate(`/dashboard/invoice/${response.data.insertedId}`);
                } catch (error) {
                    console.error('Error creating order:', error);
                }

            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="border p-2 rounded-md" />
            <button
                type="submit"
                disabled={!stripe || processing || isClearing}
                className="btn btn-primary w-full"
            >
                {processing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
            </button>

            {errors && <p className="text-red-500 text-sm">{errors}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
        </form>
    );
};

