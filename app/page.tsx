import Link from "next/link"

import PostFeed from "@/components/PostFeed"

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <ul className="flex flex-wrap items-center space-x-4 pb-4 px-2">
            <li className="font-bold">
              <Link href="#">Latest</Link>
            </li>
            <li>
              <Link href="#">Relevant</Link>
            </li>
            <li>
              <Link href="#">Top</Link>
            </li>
          </ul>
        </nav>
      </header>
      <PostFeed />
    </>
  )
}
