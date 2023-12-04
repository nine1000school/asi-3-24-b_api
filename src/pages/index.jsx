import axios from "axios"
import { useEffect, useState } from "react"

const IndexPage = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios("http://localhost:3000/api/todos")

      setTodos(data)
    })()
  }, [])

  return (
    <table className="w-full">
      <thead>
        <tr>
          {["#", "Description", "Done", "Category"].map((label) => (
            <td key={label} className="p-4 bg-slate-300">
              {label}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {todos.map(({ id, description, isDone, category: { name } }) => (
          <tr key={id} className="even:bg-slate-100">
            <td className="p-4">{id}</td>
            <td className="p-4">{description}</td>
            <td className="p-4">{isDone ? "✅" : "❌"}</td>
            <td className="p-4">{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IndexPage
