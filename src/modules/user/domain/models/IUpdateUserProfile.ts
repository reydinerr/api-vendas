export interface IUpdateUserProfile {
  id: string
  email: string
  old_password?: string
  password?: string
  avatar?: string | null
}
