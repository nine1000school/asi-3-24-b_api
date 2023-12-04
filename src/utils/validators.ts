import { string } from "yup"

export const emailValidator = string().email()
export const descriptionValidator = string().min(8)
