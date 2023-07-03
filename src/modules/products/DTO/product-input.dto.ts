import { IsNumber, IsString } from 'class-validator'

export class ProductInput {
  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsNumber()
  quantity: number
}
