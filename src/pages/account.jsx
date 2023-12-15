import { formatDateTimeShort } from "@/utils/formatters"
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import FormField from "@/web/components/ui/FormField"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { object } from "yup"

export const getServerSideProps = async () => {
  const data = await apiClient("/users")

  return {
    props: { initialData: data },
  }
}
const initialValues = {
  email: "",
  username: "",
  password: "",
}
const validationSchema = object({
  email: emailValidator.label("E-mail"),
  username: usernameValidator.label("Username"),
  password: passwordValidator.label("Password"),
})
// eslint-disable-next-line max-lines-per-function
const IndexPage = ({ initialData }) => {
  const { session, signOut } = useSession()
  const {
    isFetching,
    data: { result: users },
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient("/users"),
    initialData,
    enabled: false,
  })
  const { mutateAsync: togglePost } = useMutation({
    mutationFn: (post) => apiClient.patch(`/users/${post.id}`),
  })
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (userId) => apiClient.delete(`/users/${userId}`),
  })
  const handleSubmit = (id) => async () => {
    const user = users.find(({ id: userId }) => userId === id)
    await togglePost(user)
    await refetch()
  }
  const handleClickDelete = async (event) => {
    const postId = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deletePost(postId)
    signOut()
  }
  const [user] = users.filter((post) => post.id === session.id)

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField name="email" placeholder={user.email} />
          <FormField name="username" placeholder={user.username} />
          <FormField name="password" placeholder="Enter a new password" />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
          >
            Submit
          </button>
        </Form>
      </Formik>
      <button
        className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        data-id={user.id}
        onClick={handleClickDelete}
      >
        Delete
      </button>
    </div>
  )
}

export default IndexPage
