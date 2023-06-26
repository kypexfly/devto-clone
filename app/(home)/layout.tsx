import { SideAditional } from "@/components/SideAditional"
import { SideNav } from "@/components/SideNav"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
      <SideNav className="hidden md:block md:col-span-2" />
      <main className="col-span-6 lg:col-span-4">{children}</main>
      <SideAditional className="hidden lg:flex flex-col gap-3 lg:col-span-2" />
    </div>
  )
}
