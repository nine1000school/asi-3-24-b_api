import { boolean, number, string } from "yup"

export const emailValidator = string().email().required()
export const descriptionValidator = string().min(8).required()
export const statusValidator = boolean().required()
export const idValidator = number().min(1).required()
