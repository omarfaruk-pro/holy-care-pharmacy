// HeroSection.jsx
import { useState, useEffect } from 'react';
import Button from '../../component/buttons/Button';

export default function Offer() {
    const calculateTimeLeft = () => {
        const targetDate = new Date(localStorage.getItem('targetDate'));
        const now = new Date();
        const difference = targetDate - now;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section className='py-20'>
                <div className="container">
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                            <img src="/images/hero.png" alt="Promo" className="max-w-xs" />
                        </div>

                        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                            <p className="text-green-600 text-base font-semibold">Todays Hot Offer</p>
                            <h2 className="text-2xl md:text-4xl font-bold">
                                Buy all your medicines at {localStorage.getItem('discountPercentage')}% offer
                            </h2>
                            <p className="text-gray-600 text-base">Get extra cashback with great deals and discounts</p>

                            <div className="flex justify-center md:justify-start space-x-2 text-green-700 font-bold">
                                <div>
                                    <div className="bg-white p-2 rounded shadow w-12">{String(timeLeft.days).padStart(2, '0')}</div>
                                    <span>Days</span>
                                </div>
                                <div>
                                    <div className="bg-white p-2 rounded shadow w-12">{String(timeLeft.hours).padStart(2, '0')}</div>
                                    <span>Hrs</span>
                                </div>
                                <div>
                                    <div className="bg-white p-2 rounded shadow w-12">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                    <span>Mins</span>
                                </div>
                                <div>
                                    <div className="bg-white p-2 rounded shadow w-12">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                    <span>Secs</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                                <Button>Shop Now</Button>
                                <a href="#" className="text-green-600 underline">Deal of The Day</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

