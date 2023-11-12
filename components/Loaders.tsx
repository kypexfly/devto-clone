import { Icons } from "./Icons"

export const CircleLoader = () => {
  return (
    <div className="flex justify-center">
      <Icons.waiting className="h-5 w-5 animate-spin text-primary" />
      <div className="sr-only">Loading...</div>
    </div>
  )
}
