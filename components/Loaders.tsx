import { Icons } from "./Icons"

export const CircleLoader = () => {
  return (
    <div className="flex justify-center">
      <Icons.waiting className="h-9 w-9 animate-spin text-primary" />
      <div className="sr-only">Loading...</div>
    </div>
  )
}
