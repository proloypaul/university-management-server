import { errMessageGeneric } from './error'

export type IGenericErrorRespose = {
  statusCode: number
  message: string
  errorMessage: errMessageGeneric[]
}
