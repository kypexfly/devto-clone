import { siteConfig } from "@/config/site"

import "@/styles/globals.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import { GlobalProviders } from "@/components/GlobalProviders"
import { MainNav } from "@/components/MainNav"
import { SideAditional } from "@/components/SideAditional"
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
          <MainNav />
          {authModal}
          <div className="container py-8 grid grid-cols-1 md:grid-cols-8 gap-6 grow">
            <SideNav className="hidden md:block md:col-span-2" />
            <main className="col-span-6 lg:col-span-4">{children}</main>
            <SideAditional className="hidden lg:flex flex-col gap-3 lg:col-span-2" />
          </div>
        </GlobalProviders>
      </body>
    </html>
  )
}
