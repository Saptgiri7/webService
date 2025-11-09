import React from "react";
import { FiPhone, FiInstagram, FiFacebook} from "react-icons/fi";

export default function ComingSoonCheckout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-white to-yellow-50 text-center p-6">
      {/* Icon or Illustration */}
      
      <h1 className="font-semibold text-7xl mb-5">pengonda kalyani foods</h1>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-700 mb-4 tracking-tight">
        Payment Gate Way Coming Soon
      </h1>

      {/* Subtext */}
      <p className="text-gray-700 max-w-md leading-relaxed mb-8">
        We're working on a smooth and secure payment experience 💳. Until then, you can still place orders manually — call us or message us on social media.
      </p>

      {/* Contact Options */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="tel:+917385283012"
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors shadow-sm"
        >
          <FiPhone className="w-7 h-7" /> Call Us on 7385283012
        </a>

        <div className="flex items-center justify-center gap-5 text-yellow-600 text-2xl">
          <a href="https://www.instagram.com/pengondakalyanifoods?utm_source=ig_web_button_share_sheet&igsh=cTExODNlb2w1Ym90" target="_blank" rel="noreferrer" className="hover:text-yellow-700"><FiInstagram /></a>
          <a href="https://www.facebook.com/share/1XJjRKA9Zo/" target="_blank" rel="noreferrer" className="hover:text-yellow-700"><FiFacebook /></a>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-10 text-sm text-gray-500">Thank you for your patience ✨</p>
    </div>
  );
}