import { Provider as BalancerProvider } from "react-wrap-balancer"

import { Post } from "./Post"

export default function PostFeed() {
  const posts = Array(5)
    .fill(0)
    .map((_, i) => {
      if (i === 0) return <Post cover="http://www.fakeurl.com" key={i} />
      return <Post key={i} />
    })

  return <BalancerProvider>{posts}</BalancerProvider>
}
