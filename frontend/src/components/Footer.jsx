import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/80 backdrop-blur-md shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col md:flex-row items-center border-t border-gray-200">
        
        {/* Left / Top on mobile: Tagline */}
        <div className="flex-1 text-center md:text-left mb-3 md:mb-0">
          <p className="text-sm text-gray-600 font-medium">
            Freshness & Quality Delivered
          </p>
        </div>

        {/* Center: Company name + copyright */}
        <div className="flex-1 text-center mb-3 md:mb-0">
          <p className="font-semibold text-lg text-gray-900">Pengonda Kalyani Foods</p>
          <p className="text-sm text-gray-500">
            © {currentYear} Pengonda Kalyani Foods. All rights reserved.
          </p>
        </div>

        {/* Right / Bottom on mobile: Social media icons */}
        <div className="flex-1 flex justify-center md:justify-end space-x-4">
          <a
            href="https://www.facebook.com/share/1XJjRKA9Zo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-yellow-500 transition transform hover:scale-110"
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/pengondakalyanifoods?utm_source=ig_web_button_share_sheet&igsh=cTExODNlb2w1Ym90"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-yellow-500 transition transform hover:scale-110"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
