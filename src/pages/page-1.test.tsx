import { render } from "#test"
import { describe, expect, it } from "vitest"
import Page1 from "./page-1.page.tsx"

describe("page-1", () => {
  it("it should be able to render the page without error", async () => {
    const screen = await render(<Page1 />)
    await expect.element(screen.getByText("Page 1")).toBeVisible()
  })
})
