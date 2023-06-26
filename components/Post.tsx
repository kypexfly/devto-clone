import Image from "next/image"
import Link from "next/link"
import { Balancer } from "react-wrap-balancer"

import Tag from "./Tag"
import { AspectRatio } from "./ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { buttonVariants } from "./ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"

interface PostProps {
  cover?: string
  // title: string
  // date: string
  // author: string
  // tags: string[]
  // content: string
  // comments: number
  // reactions: number
  // slug: string
}

export function Post({ cover }: PostProps) {
  return (
    <Card className="shadow-none mb-4 bg-white dark:bg-zinc-900 border-0 max-w-3xl overflow-hidden">
      {cover && (
        <div className="cover">
          <Link href="#">
            <AspectRatio ratio={100 / 42} className="relative">
              <Image
                fill
                className="object-cover"
                loading="lazy"
                alt=""
                src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
            </AspectRatio>
          </Link>
        </div>
      )}
      <div className="flex flex-row items-center gap-2 p-6 pb-0">
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback className="bg-zinc-300 dark:bg-zinc-700">
            U
          </AvatarFallback>
        </Avatar>
        <div>
          <span>User name</span> <br />
          <small>
            <time>{new Date().toDateString()}</time>
          </small>
        </div>
      </div>
      <CardHeader className="pl-16 py-2">
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          <Balancer>
            <Link href="#">A-Z: MongoDB Cheat Sheet</Link>
          </Balancer>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-16">
        <ul className="flex flex-wrap gap-2">
          <Tag>Outline</Tag>
          <Tag>Outline</Tag>
          <Tag>Outline</Tag>
        </ul>

        <div className="pt-3">
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="#comments"
          >
            1 reaction
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="#comments"
          >
            5 comments
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
