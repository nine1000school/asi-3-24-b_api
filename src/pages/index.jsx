import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

// eslint-disable-next-line max-lines-per-function
const IndexPage = () => {
  const {
    isLoading,
    data: todos,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios("http://localhost:3000/api/todos").then(({ data }) => data),
  })
  const { mutateAsync: toggleTodo } = useMutation({
    mutationFn: (todo) =>
      axios.patch(`http://localhost:3000/api/todos/${todo.id}`, {
        isDone: !todo.isDone,
      }),
  })
  const { mutateAsync: deleteTodo } = useMutation({
    mutationFn: (todo) =>
      axios.delete(`http://localhost:3000/api/todos/${todo.id}`),
  })
  const handleClickToggle = (id) => async () => {
    const todo = todos.find(({ id: todoId }) => todoId === id)
    await toggleTodo(todo)
    await refetch()
  }
  const handleClickDelete = async (event) => {
    const id = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deleteTodo(todos.find((todo) => todo.id === id))
    await refetch()
  }

  if (isLoading) {
    return "Loading..."
  }

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
