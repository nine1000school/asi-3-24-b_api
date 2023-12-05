import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"

// eslint-disable-next-line max-lines-per-function
const IndexPage = () => {
  const {
    isLoading,
    data: categories,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient("/categories").then(({ data }) => data),
  })
  const { mutateAsync: deleteTodo } = useMutation({
    mutationFn: (categoryId) => apiClient.delete(`/categories/${categoryId}`),
  })
  const handleClickDelete = async (event) => {
    const categoryId = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deleteTodo(categoryId)
    await refetch()
  }

  if (isLoading) {
    return "Loading..."
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          {["#", "Name", "🗑️"].map((label) => (
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
        {categories.map(({ id, name }) => (
          <tr key={id} className="even:bg-slate-100">
            <td className="p-4">{id}</td>
            <td className="p-4">{name}</td>
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
