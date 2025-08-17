import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue mb-4">Get in Touch</h2>
        <p className="text-gray-600 text-lg">
          Have questions about Holy Care? Reach out to us anytime – we’re here to help.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
          <FaPhoneAlt className="text-blue text-3xl mb-3" />
          <h3 className="text-lg font-semibold mb-1">Phone</h3>
          <p className="text-gray-600">+880 1234-567890</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
          <FaEnvelope className="text-blue text-3xl mb-3" />
          <h3 className="text-lg font-semibold mb-1">Email</h3>
          <p className="text-gray-600">support@holycare.com</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
          <FaMapMarkerAlt className="text-blue text-3xl mb-3" />
          <h3 className="text-lg font-semibold mb-1">Location</h3>
          <p className="text-gray-600">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-blue mb-6">Send Us a Message</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="you@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue text-white font-semibold rounded-xl shadow hover:bg-blue/90 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
