import { formatDateTimeShort } from "@/utils/formatters"
import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/posts", { params: { page } })

  return {
    props: { initialData: data },
  }
}
// eslint-disable-next-line max-lines-per-function
const IndexPage = ({ initialData }) => {
  const { query } = useRouter()
  const page = Number.parseInt(query.page || 1, 10)
  const {
    isFetching,
    data: {
      result: posts,
      meta: { count },
    },
    refetch,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
    enabled: false,
  })
  const { mutateAsync: togglePost } = useMutation({
    mutationFn: (post) => apiClient.patch(`/posts/${post.id}`),
  })
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (postId) => apiClient.delete(`/posts/${postId}`),
  })
  const handleClickToggle = (id) => async () => {
    const post = posts.find(({ id: postId }) => postId === id)
    await togglePost(post)
    await refetch()
  }
  const handleClickDelete = async (event) => {
    const postId = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deletePost(postId)
    await refetch()
  }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <table className="w-full">
        <thead>
          <tr>
            {[
              "#",
              "User",
              "Title",
              "Content",
              "Created At",
              "Vues",
              "Modify",
              "🗑️",
            ].map((label) => (
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
          {posts.map(({ id, user, title, content, createdAt, vues }) => (
            <tr key={id} className="even:bg-slate-100">
              <td className="p-4">{id}</td>
              <td className="p-4">{user.username}</td>
              <td className="p-4">{title}</td>
              <td className="p-4">{content}</td>
              <td className="p-4">
                {formatDateTimeShort(new Date(createdAt))}
              </td>
              <td className="p-4">{vues}</td>
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
      <Pagination count={count} page={page} className="mt-8" />
    </div>
  )
}

export default IndexPage
