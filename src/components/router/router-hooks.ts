import { useEffect, useState } from "react"
import { getRouteAndSearchString, trimSlashes } from "./router-util"

let currentRoute = ""
let currentSearchString = ""
let currentSearchParams = new URLSearchParams()

type RouteListener = (route: string) => void
type SearchParamsListener = (searchParams: URLSearchParams) => void

const routeListeners = new Set<RouteListener>()
const searchParamListeners = new Set<SearchParamsListener>()

const updateRoute = (route: string) => {
  const trimmedRoute = trimSlashes(route)
  if (route !== trimmedRoute) {
    window.location.hash = trimmedRoute
    return
  }

  if (currentRoute === trimmedRoute) {
    return
  }

  currentRoute = trimmedRoute

  for (const listener of routeListeners) {
    listener(currentRoute)
  }
}

const updateSearchParams = (searchString: string) => {
  if (searchString === currentSearchString) {
    return
  }

  currentSearchString = searchString
  currentSearchParams = new URLSearchParams(currentSearchString)
  console.log("updating search params", currentSearchParams.get("param3"), searchParamListeners.size)

  for (const listener of searchParamListeners) {
    console.log("updating listener")
    listener(currentSearchParams)
  }
}

const onHashChange = () => {
  console.log("hash change", window.location.hash)
  const { route, search } = getRouteAndSearchString()
  updateRoute(route)
  updateSearchParams(search)
}

onHashChange()
window.addEventListener("hashchange", onHashChange)

export const useRoute = () => {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    routeListeners.add(setRoute)
    return () => {
      routeListeners.delete(setRoute)
    }
  }, [setRoute])

  return route
}

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState(currentSearchParams)

  useEffect(() => {
    console.log("adding search params")
    searchParamListeners.add(setSearchParams)
    return () => {
      console.log("unmounting")
      searchParamListeners.delete(setSearchParams)
    }
  }, [setSearchParams])

  return searchParams
}
