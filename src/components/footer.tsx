// components/Footer.tsx
import Image from 'next/image'; // if using next/image for logo

import { Mail ,Facebook} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo */}
        <div>
          <div className="mb-4">
            <Image
              src="/logo.png" // replace with your logo path
              alt="Company Logo"
              width={150}
              height={50}
            />
          </div>
          <p className="text-gray-400 text-sm">
            Building the future of the web with scalable and modern solutions.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Web App</a></li>
            <li><a href="#" className="hover:text-gray-400">Mobile App</a></li>
            <li><a href="#" className="hover:text-gray-400">API Service</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Docs</a></li>
            <li><a href="#" className="hover:text-gray-400">Community</a></li>
            <li><a href="#" className="hover:text-gray-400">Support</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
            <ul>
                <li className='flex'>  <Mail className=' h-5 w-5 mr-3'/>
             <a href="#" className="hover:text-gray-400">
               apple14123
               @adsd.com</a></li>
            </ul>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li><ul className='flex gap-2'><li><a href="#" className="hover:text-gray-400 text-2xl"><Facebook /></a></li>
            <li><a href="#" className="hover:text-gray-400 text-2xl"><Facebook /></a></li>
            <li><a href="#" className="hover:text-gray-400 text-2xl"><Facebook /></a></li></ul>
            </li>
            <li><a href="#" className="hover:text-gray-400"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.249621578338!2d85.32694469004674!3d27.692192356948386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a7680dfe87%3A0xda75b2e13b0b0ffe!2sOne%20Cinemas%20Baneshwor!5e0!3m2!1sen!2snp!4v1747114664569!5m2!1sen!2snp"
             width="90" height="60"
              style={{border:0}}
               allowFullScreen
                loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"></iframe></a></li>
            
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
