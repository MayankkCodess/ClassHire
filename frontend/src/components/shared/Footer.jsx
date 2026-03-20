import React from "react"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Separator } from "@/components/ui/separator"

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
