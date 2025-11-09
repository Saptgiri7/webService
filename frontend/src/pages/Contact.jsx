import React from "react";

const Contact = () => {
  const locations = [
    {
      city: "Solapur, Maharashtra",
      address: "Chatti Gali, Infront of Sudha Idli Gruh",
      phone: "+91 7385283012",
      email: "kalyanipengonda@gmail.com",
    },
    {
      city: "Kolhapur, Maharashtra",
      address: "13th Ln, Rajarampuri, Kolhapur, Maharashtra, India",
      phone: "+91 7385283012",
      email: "kalyanipengonda@gmail.com",
    },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-80px)] flex items-center justify-center px-12 py-24">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-md p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Get in Touch
        </h1>

        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products,
          need assistance, or just want to connect — feel free to reach out through
          any of the locations below. Our team is always happy to help 😊
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                📍 {loc.city}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Address:</span> {loc.address}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Phone:</span> {loc.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {loc.email}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12">
          You can also reach out to us on our{" "}
          <span className="text-blue-600 font-medium">
            social media
          </span>{" "}
           handles for quick support 💬
        </p>
      </div>
    </div>
  );
};

export default Contact;
