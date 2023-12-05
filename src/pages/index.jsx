import axios from "axios"
import { useEffect, useState } from "react"

// eslint-disable-next-line max-lines-per-function
const IndexPage = () => {
  const [todos, setTodos] = useState([])
  const handleClickToggle = (id) => async () => {
    const index = todos.findIndex((todo) => todo.id === id)
    const { data } = await axios.patch(
      `http://localhost:3000/api/todos/${id}`,
      {
        isDone: !todos[index].isDone,
      },
    )

    setTodos(todos.with(index, data))
  }
  const handleClickDelete = async (event) => {
    const id = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await axios.delete(`http://localhost:3000/api/todos/${id}`)
    setTodos(todos.filter((todo) => todo.id !== id))
  }

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
          {["#", "Description", "Done", "Category", "", "🗑️"].map((label) => (
            <td
              key={label}
              className="p-4 bg-slate-300 text-center font-semibold"
            >
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
            <td className="p-4">
              <button onClick={handleClickToggle(id)}>Toggle</button>
            </td>
            <td className="p-4">
              <button data-id={id} onClick={handleClickDelete}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IndexPage
