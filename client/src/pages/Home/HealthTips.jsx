import { Link } from "react-router";
import { MdCalendarMonth } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Button from "../../component/buttons/Button";

export default function HealthTips() {
    const tips = [
        {
            title: "5 Tips for Managing Blood Pressure",
            desc: "Learn effective lifestyle habits and medicine routines to control blood pressure.",
            img: "https://media.assettype.com/thequint-fit%2F2020-10%2F3953de19-b26d-4dc8-ba56-bd7e79fe7085%2FiStock_923681856.jpg"
        },
        {
            title: "Importance of Staying Hydrated",
            desc: "Hydration impacts your mood, memory, and immunity. Here’s how to stay on top of it.",
            img: "https://www.athletico.com/wp-content/uploads/2012/08/Hydration.jpg"
        },
        {
            title: "Understanding Common Painkillers",
            desc: "Ibuprofen or paracetamol? Know when and how to take pain relief safely.",
            img: "https://static1.squarespace.com/static/5f6f49618cd6b20cc01ee53d/5f6f586b3a2a3d397029a39e/6151a5c86835c54ef272bef7/1633500031887/painkiller-tablets.jpeg?format=1500w"
        }
    ];

    return (
        <section className="bg-gray-100 py-16">
            <div className="container ">
                <div className="flex justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold ">Health Tips & Articles</h2>
                    <Link to={"/health-tips"}>
                        <Button className={`px-10`}>View All</Button>
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className="rounded-lg shadow-md overflow-hidden bg-white group h-full"
                        >
                            <div className="overflow-hidden">
                                <img src={tip.img} alt={tip.title} className="w-full h-60 object-cover group-hover:scale-110 duration-300 ease-linear" />
                            </div>
                            <div className="p-7 text-left">
                                <div className="flex gap-2 items-center  justify-between">
                                    <p className="flex gap-2 items-center "><MdCalendarMonth className="-mt-0.5" /> <span className="font-semibold">May 1, 2023</span></p>
                                    <p className="flex gap-2"><FaUser /> <span className="font-semibold">Dr. John Doe</span></p>
                                </div>
                                <h3 className="text-xl font-semibold mt-3 mb-1 hover:text-primary duration-300 ease-linear"><Link>{tip.title}</Link></h3>
                                <p className="text-sm text-gray-600">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
