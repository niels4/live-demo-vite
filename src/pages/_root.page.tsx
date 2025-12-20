const RootPage = () => {
  return (
    <main data-testid="root-view">
      <h1>Live Demo - Vite</h1>
      <p>
        A demo of a live coding environment using &nbsp;
        <a target="_blank" href="https://github.com/niels4/websocket-text-relay">
          websocket-text-relay
        </a>
        .
        <br />
        <br />
        Built with Vite, Typescript, and React. Live editing (hot module reloading as you type, no need to
        save the file) provided by &nbsp;
        <a target="_blank" href="https://github.com/niels4/vite-plugin-websocket-text-relay">
          vite-plugin-websocket-text-relay
        </a>
      </p>

      <section>
        <header>
          <h2>Basics</h2>
          <p>Examples of basic webapp features such as routing, links, and URL search parameters</p>
        </header>

        <nav>
          <a href="#basics/search-params?count=7">Search Params</a>
          <p>Example of reading and setting URL search parameters</p>
        </nav>
      </section>
    </main>
  )
}

export default RootPage
