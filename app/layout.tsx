import { siteConfig } from "@/config/site"

import "@/styles/globals.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/Toaster"
import { GlobalProviders } from "@/components/GlobalProviders"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteNavbar } from "@/components/SiteNavbar"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen bg-zinc-100 dark:bg-background`}
      >
        <GlobalProviders>
          <SiteNavbar />
          {authModal}
          <div className="container px-0 py-0 md:px-3 md:py-8 flex flex-col grow">
            {children}
          </div>
          <Toaster />
          <SiteFooter />
        </GlobalProviders>
      </body>
    </html>
  )
}
