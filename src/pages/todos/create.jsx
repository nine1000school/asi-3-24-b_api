import { descriptionValidator } from "@/utils/validators"
import FormField from "@/web/components/FormField"
import axios from "axios"
import { Form, Formik } from "formik"
import { object } from "yup"

const initialValues = {
  description: "",
  categoryId: 1,
}
const validationSchema = object({
  description: descriptionValidator.label("Description"),
})
// eslint-disable-next-line max-lines-per-function
const CreateTodoPage = () => {
  const handleSubmit = async (values, { resetForm }) => {
    await axios.post("http://localhost:3000/api/todos", values)

    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4" noValidate>
        <FormField name="description" placeholder="Enter a description" />
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

export default CreateTodoPage
