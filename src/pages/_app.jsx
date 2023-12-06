import "@/styles/globals.css"
import Link from "@/web/components/Link"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient()
const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={client}>
    <div className="flex flex-col">
      <header className="border-b-2 bg-slate-100">
        <div className="flex md:max-w-2xl mx-auto p-4">
          <div className="text-2xl">LOGO</div>
          <nav className="ms-auto">
            <ul className="flex gap-4">
              <li>
                <Link href="/">List todos</Link>
              </li>
              <li>
                <Link href="/todos/create">Create todo</Link>
              </li>
              <li>
                <Link href="/categories">List categories</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="p-4">
        <div className="md:max-w-2xl p-4 mx-auto">
          <Component {...pageProps} />
        </div>
      </section>
    </div>
  </QueryClientProvider>
)

export default App
