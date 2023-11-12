import { Container } from "@/components/Container"
import { SiteFooter } from "@/components/SiteFooter"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Container>{children}</Container>
      <SiteFooter />
    </>
  )
}
