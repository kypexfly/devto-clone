import Post from "./Post"

export default function PostFeed() {
  return Array(5)
    .fill(0)
    .map((_, i) => <Post key={i} />)
}
