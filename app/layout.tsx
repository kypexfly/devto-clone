import { siteConfig } from "@/config/site"

import "@/styles/globals.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import { MainNav } from "@/components/MainNav"
import { Providers } from "@/components/Providers"
import { SideNav } from "@/components/SideNav"

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen bg-background`}
      >
        <Providers>
          <MainNav />
          <div className="container py-8 grid grid-cols-1 md:grid-cols-5 gap-6 grow">
            <SideNav className="hidden md:block md:col-span-1" />
            <main className="col-span-4">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
