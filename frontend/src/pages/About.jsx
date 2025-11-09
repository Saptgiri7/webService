const About = () => {
  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full text-center md:text-left">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          About Us
        </h1>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <img
            src="https://res.cloudinary.com/daexjbyvz/image/upload/c_fill,q_auto,f_auto/v1737029535/IMG-20220928-WA0033_avrbyy.jpg"
            alt="About Us"
            className="rounded-2xl shadow-md object-cover w-full h-72 md:h-96"
          />

          {/* Text */}
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              At <span className="font-semibold text-black">Pengonda Kalyani Foods</span>, 
              we believe in delivering homemade, pure, and chemical-free food made 
              with love and care. Our mission is to bring authentic traditional 
              flavors straight from local kitchens to your dining table.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Each product is handcrafted using the finest natural ingredients, 
              ensuring not just taste but also health and happiness. We partner 
              with local communities to support sustainable and ethical production.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our journey began with a simple goal — to make pure, homemade food 
              accessible to everyone. Thank you for being part of our story ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
