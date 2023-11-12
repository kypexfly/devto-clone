import React from "react"

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex min-h-[75vh] grow flex-col p-0 pb-2 md:px-3 md:py-8">
      {children}
    </div>
  )
}
