export async function POST(req: Request) {
  const body = await req.json()

  return new Response(`Hiii, ${body.name}!\n`, { status: 200 })
}
