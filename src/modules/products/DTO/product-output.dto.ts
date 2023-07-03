import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator'

export class ProductOutput {
  @IsUUID()
  id: string

  //order_products?: IOrderProducts[]

  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsNumber()
  quantity: number

  @IsDate()
  created_at: Date

  @IsDate()
  updated_at: Date
}
