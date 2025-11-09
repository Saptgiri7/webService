import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left side: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="5"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Right side: Info */}
          <div className="flex flex-col justify-center text-gray-700">
            <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
            <p className="mb-4">
              Have questions or feedback? We’d love to hear from you.
            </p>

            <p className="mb-2">
              📍 <span className="font-medium">Address:</span> Solapur, Maharashtra, India
            </p>
            <p className="mb-2">
              📞 <span className="font-medium">Phone:</span> +91 98765 43210
            </p>
            <p className="mb-2">
              ✉️ <span className="font-medium">Email:</span> support@yourcompany.com
            </p>

            <p className="mt-6 text-sm text-gray-500">
              We typically respond within 24 hours 😊
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
