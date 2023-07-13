import { SideAditional } from "@/components/SideAditional"
import { SideNav } from "@/components/SideNav"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-8">
      <SideNav className="hidden md:col-span-2 md:block" />
      <main className="col-span-6 lg:col-span-4">{children}</main>
      <SideAditional className="hidden flex-col gap-3 lg:col-span-2 lg:flex" />
    </div>
  )
}
