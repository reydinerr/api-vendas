export interface IUser {
  id: string
  name: string
  email: string
  age: number
  cpf: string
  password: string
  avatar: string | null
  created_at: Date
  updated_at: Date
  //getAvatarUrl(): string | null
}
