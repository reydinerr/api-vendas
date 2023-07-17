export interface IUpdateUserProfile {
  id: string
  email: string
  old_password?: string
  password?: string
}
export interface IUpdateUserProfileInput {
  id: string
  email: string
  password?: string
}
