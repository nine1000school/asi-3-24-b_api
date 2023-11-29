import mw from "@/api/mw"

const handle = mw({
  GET: [
    (req, res) =>
      new Promise((r) => {
        setTimeout(r, 1500)
      }).then(() => res.send()),
  ],
  POST: [(req, res) => res.send("Hello")],
})

export default handle
