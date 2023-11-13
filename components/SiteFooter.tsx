import Link from "next/link"

import { Icons } from "./Icons"

const socials = [
  {
    label: "Facebook page",
    icon: Icons.facebook,
  },
  {
    label: "Discord community",
    icon: Icons.discord,
  },
  {
    label: "Twitter page",
    icon: Icons.twitter,
  },
  {
    label: "Github account",
    icon: Icons.github,
  },
  {
    label: "Dribbble account",
    icon: Icons.dribbble,
  },
]

export function SiteFooter() {
  return (
    // pb-12 for post bar options in mobile view
    <footer className="border-t border-t-border bg-white pb-12 dark:bg-zinc-900 sm:pb-0">
      <div className="container pt-10">
        <div className="grid grid-cols-2 gap-8 py-6 md:grid-cols-4 lg:py-8">
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
          <div className="mt-4 flex space-x-3 sm:justify-center md:mt-0">
            {socials.map((s) => (
              <a
                href="/#"
                key={s.label}
                className="rounded-full bg-secondary p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <s.icon className="h-4 w-4" />
                <span className="sr-only">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
