import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function TopRatedMedicines() {
  const medicines = [
    {
      name: "Paracetamol 500mg",
      rating: 5.4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxs10j_nKrTmJroVB_bqt5v82X43PWwx29Xg&s"
    },
    {
      name: "Vitamin C Tablets",
      rating: 4.5,
      img: "https://medex.com.bd/storage/images/packaging/ceevit-250-mg-chewable-tablet-85600762215-i1-5rURurnYyRdvhvswV3DY.webp"
    },
    {
      name: "Cough Syrup 100ml",
      rating: 4.7,
      img: "https://i.chaldn.com/_mpimage/miraten-syrup-100ml-1-pc?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D102151&q=low&v=1"
    },
    {
      name: "Cough Syrup 100ml",
      rating: 4.7,
      img: "https://i.chaldn.com/_mpimage/miraten-syrup-100ml-1-pc?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D102151&q=low&v=1"
    }
  ];

  const renderStars = (rating) => {
    if (rating > 5) {
      rating = 5;
    }else if (rating < 0) {
      rating = 0;
    }
    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="text-yellow-500 text-xl" />);
    }

    if (remainder > 0) {
      const fillPercent = Math.round(remainder * 100);
      stars.push(
        <div key="partial" className="relative w-5 h-5">
          <AiOutlineStar className="absolute text-yellow-300 text-xl" />
          <div
            className="absolute top-0 left-0 h-full w-5 overflow-hidden"
            style={{ width: `${fillPercent}%` }}
          >
            <AiFillStar className="text-yellow-500 text-xl" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} className="text-yellow-300 text-xl" />);
    }

    return (
      <div className="flex items-center gap-0">
        {stars}
        <span className="text-gray-700 text-sm ml-2 mt-0.75">({rating})</span>
      </div>
    );
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Top Rated Medicines</h2>
        <div className="grid md:grid-cols-4 gap-5">
          {medicines.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden h-full bg-white"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 pb-6 text-left">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                {renderStars(item.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
