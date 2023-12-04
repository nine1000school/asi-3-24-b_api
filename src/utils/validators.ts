import { string } from "yup"

export const emailValidator = string().email().required()
export const descriptionValidator = string().min(8).required()
