import { FaCheckCircle } from "react-icons/fa";

export default function FeaturedProduct() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div>
          <img
            src="https://australianmade.com.au/assets/0d7d2e11-0430-4aad-a394-93f15d3f9bc6.jpg"
            alt="Featured Medicine"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Medicine of the Month
          </h2>
          <p className="text-gray-700 mb-6">
            <strong>ImmunoBoost+ Capsules</strong> are specially formulated with
            essential vitamins, zinc, and antioxidants to enhance your immune
            system. Ideal for daily wellness and recovery.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Boosts natural immunity
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Contains Vitamin C, Zinc, and Echinacea
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Clinically tested and safe
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              Suitable for all ages
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheckCircle className="text-green-500 mr-2" />
              No side effects reported
            </li>
          </ul>

          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}
