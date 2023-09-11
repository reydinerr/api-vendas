export interface IUpdateCustomerProfile {
  id: string
  name: string
  email: string
  old_password?: string
  password?: string
  avatar?: string | null
}
