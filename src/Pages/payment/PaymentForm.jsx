import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const PaymentForm = () => {

    const stripe = useStripe();
    const element = useElements();
    const [error, setError] = useState('');
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: parcelsInfo = {}, isPending } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure(`/parcels/${id}`);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );

    };

    const amount = parcelsInfo.cost;
    const amountCents = amount * 100;
    console.log(amountCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !element) {
            return;
        };

        const card = element.getElement(CardElement);

        if (!card) {
            return;
        };
        // ==============
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        // ==============
        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        };
        // ===================Payment Intent =============
        const res = await axiosSecure.post('/create-payment-intent', {
            amountCents,
            id
        });
        const clientSecret = res.data.clientSecret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: element.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });
        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment Successful');
                console.log(result);
            }
        }
        console.log('payment Intent ', res);
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='p-6 shadow-md bg-white rounded-xl max-w-md w-full space-y-6 mx-auto'>
                <CardElement className='p-2 border rounded' />
                <button className='btn btn-primary w-full text-black' type='submit' disabled={!stripe}>
                    pay ${amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;