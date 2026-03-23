import React from "react"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Separator } from "@/components/ui/separator.jsx"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#384B70] dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Logo + Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#F3F5F7] dark:text-white">
              ClassHire
            </h2>
            <p className="text-sm text-[#F3F5F7] mt-2 dark:text-gray-400">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-[#F3F5F7] hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              About
            </a>
            <a href="#" className="text-[#F3F5F7] hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Careers
            </a>
            <a href="#" className="text-[#F3F5F7] hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" className="text-[#F3F5F7] hover:text-blue-600">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-[#F3F5F7] hover:text-sky-500">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-[#F3F5F7] hover:text-blue-700">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-[#F3F5F7] hover:text-pink-500">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Separator */}
        {/* <Separator className="my-8" /> */}

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p className="text-[#F3F5F7]">Made by Mayank Kaushik</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="text-[#F3F5F7] hover:text-gray-900" href="#">Privacy Policy</a>
            <a className="text-[#F3F5F7] hover:text-gray-900" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}



// import React from "react";
// import { Link } from "react-router-dom";
// import { Mail, Twitter, Linkedin, Github } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-white dark:bg-[#0a0a0f] border-t border-gray-100 dark:border-white/10">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Main footer content */}
//         <div className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div className="col-span-2 sm:col-span-1">
//             <Link to="/" className="flex items-center gap-2 mb-4">
//               <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cbf] to-[#b06ab3] text-white text-xs font-bold shadow-lg shadow-purple-500/30">
//                 CH
//               </span>
//               <span className="text-xl font-bold text-gray-900 dark:text-white">
//                 Class<span className="bg-gradient-to-r from-[#7c5cbf] to-[#b06ab3] bg-clip-text text-transparent">Hire</span>
//               </span>
//             </Link>
//             <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">
//               Search, apply & get hired. India's most trusted job platform.
//             </p>
//             {/* Social icons */}
//             <div className="flex items-center gap-3 mt-5">
//               {[
//                 { icon: Twitter, href: "#" },
//                 { icon: Linkedin, href: "#" },
//                 { icon: Github, href: "#" },
//                 { icon: Mail, href: "mailto:support@classhire.com" },
//               ].map(({ icon: Icon, href }, i) => (
//                 <a
//                   key={i}
//                   href={href}
//                   className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-[#7c5cbf] hover:to-[#b06ab3] hover:text-white dark:hover:text-white transition-all duration-200"
//                 >
//                   <Icon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Product */}
//           <div>
//             <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
//               Product
//             </h4>
//             <ul className="space-y-3">
//               {[
//                 { label: "Browse Jobs", to: "/jobs" },
//                 { label: "Companies", to: "/browse" },
//                 { label: "Job Alerts", to: "#" },
//                 { label: "Download App", to: "#" },
//               ].map(({ label, to }) => (
//                 <li key={label}>
//                   <Link
//                     to={to}
//                     className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#9b6fd4] dark:hover:text-[#c084fc] transition-colors"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
//               Company
//             </h4>
//             <ul className="space-y-3">
//               {[
//                 { label: "About Us", to: "#" },
//                 { label: "Contact", to: "#" },
//                 { label: "Privacy Policy", to: "#" },
//                 { label: "Terms of Service", to: "#" },
//               ].map(({ label, to }) => (
//                 <li key={label}>
//                   <Link
//                     to={to}
//                     className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#9b6fd4] dark:hover:text-[#c084fc] transition-colors"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Connect */}
//           <div>
//             <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
//               Connect
//             </h4>
//             <a
//               href="mailto:support@classhire.com"
//               className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#9b6fd4] dark:hover:text-[#c084fc] transition-colors"
//             >
//               support@classhire.com
//             </a>
//             <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 leading-relaxed">
//               Mon–Fri, 9am – 6pm IST
//             </p>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="py-5 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-xs text-gray-400 dark:text-gray-600">
//             © {new Date().getFullYear()} ClassHire. All rights reserved.
//           </p>
//           <p className="text-xs text-gray-400 dark:text-gray-600">
//             Governed by the laws of India.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;