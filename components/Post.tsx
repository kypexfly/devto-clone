import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"

export default function Post() {
  return (
    <Card className="shadow-none mb-2 border-0 bg-white dark:bg-zinc-900">
      <CardHeader>
        <CardTitle className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          A-Z: MongoDB Cheat Sheet🌱
        </CardTitle>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, porro
        iusto. Magnam id laudantium laborum doloribus aut delectus ad non sequi
        ullam dicta iure quia culpa error, asperiores libero architecto.
      </CardContent>
      <CardFooter>Reactions | Comments</CardFooter>
    </Card>
  )
}
