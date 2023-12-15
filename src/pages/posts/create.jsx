import { titleValidator, contentValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import axios from "axios"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  title: "",
  content: "",
}
const validationSchema = object({
  title: titleValidator.label("Title"),
  content: contentValidator.label("Content"),
})
// eslint-disable-next-line max-lines-per-function
const CreatePostPage = () => {
  const { session } = useSession()
  const handleSubmit = async (values, { resetForm }) => {
    if (session) {
      values.userId = session.id
      await axios.post("http://localhost:3000/api/posts", values)

      resetForm()
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="Enter a title" />
        <FormField name="content" placeholder="Enter a content" />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        >
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default CreatePostPage
