import { boolean, number, string } from "yup"

export const emailValidator = string().email().required()
export const descriptionValidator = string().min(8).required()
export const statusValidator = boolean().required()
export const idValidator = number().integer().min(1).required()
export const pageValidator = number().integer().min(1).default(1).required()
