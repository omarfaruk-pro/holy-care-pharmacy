import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import BannerLoader from './BannerLoader';
import Button from '../../component/buttons/Button';
import shape1 from '../../assets/images/shape-1.png';
import {HiArrowRight} from "react-icons/hi"


export default function BannerSlider() {
    const axiosSecure = useAxiosSecure();
    const { data: banner = [], isLoading, isError } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure(`/banners?active=${true}`);
            return res.data;
        }
    });
    console.log(banner);

    if (isLoading) return <BannerLoader></BannerLoader>;
    if (isError) return <div>Error</div>;

    const banners = [
        {
            "_id": "686eb370507f6d0c53f5111f",
            "productImage": "https://i.ibb.co.com/Gf8gnsCJ/ucrfate.png",
            "name": "Ucrafate syrup",
            "uses": "Intestinal ulcers",
            "subtitle": "Ucrafate is a prescription medicine used in the treatment of ulcers in the stomach and intestine. It forms a coating over ulcers and creates a physical barrier thereby promotes healing of ulcer.",
            "status": "active",
            "sellerEmail": "aadmin@gmail.com",
            "date": "2025-07-09T18:22:40.820Z"
        },
        {
            "_id": "686d61220e197804f2224d4d",
            "productImage": "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0LXBfaW1hZ2VzXC8xMTMyXC8xMTMyLUFuZWZlci1JVi1jb3B5LXMyZmFvYy5qcGVnIiwiZWRpdHMiOltdfQ==",
            "name": "Anefer IV Injection",
            "uses": "Iron deficiency anemia",
            "subtitle": "Anefer is an iron replacement product. It is used to treat a type of anemia where you have too few red blood cells because you have too little iron in your body (iron-deficiency anaemia).",
            "status": "active",
            "sellerEmail": "seller@holycare.com",
            "createdAt": "2025-07-08"
        },
        {
            "_id": "686d61220e197804f2224d4c",
            "productImage": "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0LXBfaW1hZ2VzXC8yNzIwNFwvMjcyMDQtc21jLW9yc2FsaW5lLTBvZHExOS5qcGVnIiwiZWRpdHMiOltdfQ==",
            "name": "Orsaline (SMC)",
            "uses": "Diarrhea, Dehydration, Electrolytes imbalance",
            "subtitle": "Depressed renal function, severe continuing diarrhoea or other critical fluid losses may need supplementation with parenteral fluids along with oral saline. Reconstitue saline should be used within 6 hours",
            "status": "inactive",
            "sellerEmail": "seller@holycare.com",
            "createdAt": "2025-07-08"
        }
    ]

    return (
        <section className="relative overflow-hidden bg-[#F2F6F7]">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                autoplay={{ delay: 500000 }}
                effect="fade"
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-[56rem]  md:h-[40rem] lg:h-[44rem]"
            >
                {banners.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full relative bg-[#F2F6F7]"

                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="container px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">

                                    <div className=" space-y-4">
                                        <p className='text-primary inline-block font-black text-xl rounded capitalize mb-5'>{slide.uses}</p>
                                        <h2 className="text-3xl md:text-6xl font-bold capitalize">{slide.name}</h2>
                                        <p className='text-lg font-normal leading-tight text-[#777] max-w-130 mb-8'>{slide.subtitle.slice(0, 100)}...</p>

                                        <Button className="mt-4 flex items-center gap-3">
                                            View Details <HiArrowRight />
                                        </Button>
                                    </div>

                                    <div className="flex justify-center relative z-5 text-right">
                                        <img
                                            src={slide.productImage}
                                            alt={slide.name}
                                            className="max-h-140 h-full w-full object-contain rounded-xl object-right"
                                        />
                                    </div>

                                </div>
                            </div>
                             <img className='absolute top-1/2 -translate-y-1/2 right-0 z-1 w-full max-w-160' src={shape1} alt="Shape" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

           
        </section>
    );
}
