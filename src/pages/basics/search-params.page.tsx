import { useSearchParams, useSetSearchParams } from "#src/components/router/router-hooks.ts"

export default function SearchParamsPage() {
  const searchParams = useSearchParams()
  const count = Number(searchParams.get("count") ?? 0)
  const setSearchParams = useSetSearchParams()

  const onClickMeClick = () => {
    setSearchParams({ count: count + 1 })
  }

  const onResetClick = () => {
    setSearchParams({ count: null })
  }

  return (
    <main className={"wrapper"}>
      <h1>Search Params Example</h1>

      <p>
        <strong>Clicks:</strong>&nbsp;
        <span data-testid="click-count" id="click-count">
          {count}
        </span>
      </p>

      <div className="button_row">
        <button id="click-me-button" onClick={onClickMeClick}>
          Click me
        </button>
        <button id="reset-button" onClick={onResetClick}>
          Reset
        </button>
      </div>

      <a href="#">Back to Root Page</a>
    </main>
  )
}
