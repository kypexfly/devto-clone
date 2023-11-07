import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import Page from "./page"

test("renders server component", () => {
  render(<Page />)
  expect(screen.getByText(/Latest posts/i)).toBeDefined()
})
