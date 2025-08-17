import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FaCheckCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import BannerLoader from './BannerLoader';


export default function BannerSlider() {
    const axiosSecure = useAxiosSecure();
    const {data:banners = [], isLoading, isError} = useQuery({
        queryKey: ['banners'],
        queryFn: async() => {
            const res = await axiosSecure(`/banners?active=${true}`);
            return res.data;
        }
    });


    if (isLoading) return <BannerLoader></BannerLoader>;
    if (isError) return <div>Error</div>;

    return (
        <section>
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                autoplay={{ delay: 5000 }}
                effect="fade"
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-[56rem]  md:h-[40rem] lg:h-[44rem]"
            >
                {banners.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.bgImage})` }}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,.85)_0%,_rgba(0,0,0,0.9)_100%)] flex items-center">
                                <div className="container px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">

                                    {/* Product Image */}
                                    <div className="flex justify-center">
                                        <img
                                            src={slide.productImage}
                                            alt={slide.name}
                                            className="h-100 w-full object-contain rounded-xl shadow-2xl bg-white p-4"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="text-white space-y-4">
                                        <h2 className="text-3xl md:text-4xl font-bold">{slide.name}</h2>
                                        <ul className="space-y-1 pl-5 list-disc text-lg text-gray-200">
                                            {slide.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <FaCheckCircle className="text-white mt-1" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition">
                                            View Details
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
