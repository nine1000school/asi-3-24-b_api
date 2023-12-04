import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <div className="flex flex-col">
    <header className="border-b-2 bg-slate-100">
      <div className="flex md:max-w-2xl mx-auto p-4">
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
      </div>
    </header>
    <section className="p-4">
      <div className="md:max-w-2xl p-4 mx-auto">
        <Component {...pageProps} />
      </div>
    </section>
  </div>
)

export default App
