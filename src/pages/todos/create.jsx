import { descriptionValidator, emailValidator } from "@/utils/validators"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from "yup"

const initialValues = {
  email: "",
  description: "",
}
const validationSchema = yup.object({
  email: emailValidator.label("E-mail"),
  description: descriptionValidator.label("Description"),
})
const CreateTodoPage = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4" noValidate>
        <Field
          name="email"
          type="email"
          className="border-2 p-2"
          placeholder="Enter your e-mail"
        />
        <ErrorMessage name="email" component="p" className="text-red-500" />
        <Field
          name="description"
          className="border-2 p-2"
          placeholder="Enter a description"
        />
        <ErrorMessage
          name="description"
          component="p"
          className="text-red-500"
        />
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
