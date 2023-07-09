export interface IUpdateUserProfile {
  id: string
  data: {
    email: string
    password: string
    old_password: string
  }
}
