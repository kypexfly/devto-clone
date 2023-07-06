import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SettingsUpdateValidator } from "@/lib/validators/settings"

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { bio, location, username, website } =
      SettingsUpdateValidator.parse(body)

    // check if username is taken
    const usernameExist = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (usernameExist && usernameExist.id !== session.user.id) {
      return new Response("Username is taken", { status: 409 })
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username,
        details: {
          upsert: {
            create: {
              bio,
              location,
              website,
            },
            update: {
              bio,
              location,
              website,
            },
          },
        },
      },
    })

    return new Response("OK")
  } catch (error) {
    error

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(JSON.stringify(JSON.stringify(error), null, 2), {
      status: 500,
    })
  }
}
