import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white dark:bg-zinc-900 md:border-t-0">
      <div className="container mx-auto px-6 py-12">
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Product
            </h3>
            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Overview
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Solutions
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Tutorials
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Releases
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Company
            </h3>
            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                About us
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Careers
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Press
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                News
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Media kit
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Contact
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Resources
            </h3>
            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Newsletter
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Events
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Help center
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Tutorials
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Supports
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Use cases
            </h3>
            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Startups
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Enterprise
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Government
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Saas
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Marketplaces
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Ecommerce
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Social
            </h3>
            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Github
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                AngelList
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Dribble
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Legal
            </h3>
            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Licenses
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Settings
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 md:my-10" />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Link href="/">DEV Community</Link>
          <p className="mt-4 text-sm sm:mt-0">
            © Copyright 2023. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
