import { siteConfig } from "@/config/site"

import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
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
  icons: {
    icon: "/icon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
        className={`${inter.className} flex min-h-screen flex-col bg-zinc-100 antialiased dark:bg-background`}
      >
        <GlobalProviders>
          <SiteNavbar />
          {authModal}
          <div className="container flex min-h-[75vh] grow flex-col p-0 pb-2 md:px-3 md:py-8">
            {children}
          </div>
          <Toaster />
          <SiteFooter />
        </GlobalProviders>
      </body>
    </html>
  )
}
