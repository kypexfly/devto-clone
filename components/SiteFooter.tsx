import Link from "next/link"

import { Icons } from "./Icons"

export function SiteFooter() {
  return (
    <footer className="bg-white dark:bg-zinc-900">
      <div className="container pt-10">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Company
            </h2>
            <ul className="font-medium text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Help center
            </h2>
            <ul className="font-medium text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Legal
            </h2>
            <ul className="font-medium text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Download
            </h2>
            <ul className="font-medium text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <Link href="/">DEV Community</Link>. All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-5 sm:justify-center md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icons.facebook className="h-4 w-4" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icons.discord className="h-4 w-4" />
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icons.twitter className="h-4 w-4" fill="currentColor" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="https://github.com/kypexfly/devto-clone"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.github className="h-4 w-4" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icons.dribbble className="h-4 w-4" />
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
