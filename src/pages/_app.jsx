import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <div className="flex flex-col">
    <header className="border-b-2 bg-slate-100 p-4 flex">
      <div className="text-2xl">LOGO</div>
      <nav className="ms-auto">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
    <section className="p-4">
      <Component {...pageProps} />
    </section>
  </div>
)

export default App
