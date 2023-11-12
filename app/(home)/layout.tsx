import { Container } from "@/components/Container"
import { SideNav } from "@/components/SideNav"

import { DiscussCard } from "./DiscussCard"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Container>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-8">
          <SideNav className="hidden md:col-span-2 md:block" />

          <main className="col-span-6 lg:col-span-4">{children}</main>

          <aside className="hidden flex-col gap-3 lg:col-span-2 lg:flex">
            <DiscussCard />
          </aside>
        </div>
      </Container>
    </>
  )
}
