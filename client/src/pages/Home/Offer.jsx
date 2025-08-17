import { useState, useEffect } from 'react';
import Button from '../../component/buttons/Button';
import offerImg from "../../assets/images/offer-img.jpg";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function Offer() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const axiosSecure = useAxiosSecure();

    const { data: offerInfo, isLoading, error } = useQuery({
        queryKey: ['offer', "68a1d57cd12cb04bc1a1ff68"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offer-info/68a1d57cd12cb04bc1a1ff68`);
            return res.data; // axios এ সবসময় data property থাকে
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    const calculateTimeLeft = () => {
        if (!offerInfo?.time) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const targetDate = new Date(offerInfo.time);
        const now = new Date();
        const difference = targetDate - now;

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    useEffect(() => {
        if (!offerInfo?.time) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [offerInfo]);

    if (isLoading) return <p className="text-center text-gray-500">Loading offer...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <section className="py-20">
            <div className="container">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                    {/* Left Image */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                        <img src={offerImg} alt="Promo" className="w-full rounded-xl" />
                    </div>

                    {/* Right Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                        <p className="text-green-600 text-base font-semibold">Todays Hot Offer</p>
                        <h2 className="text-2xl md:text-4xl font-bold">
                            Buy all your medicines at {offerInfo?.percentage || 0}% off
                        </h2>
                        <p className="text-gray-600 text-base">Get extra cashback with great deals and discounts</p>

                        {/* Countdown */}
                        <div className="flex justify-center md:justify-start space-x-2 text-green-700 font-bold">
                            {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="bg-white p-2 rounded shadow w-12">
                                        {String(timeLeft[unit]).padStart(2, '0')}
                                    </div>
                                    <span className="text-xs">
                                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex justify-center md:justify-start space-x-4 mt-4">
                            <Button>Shop Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
