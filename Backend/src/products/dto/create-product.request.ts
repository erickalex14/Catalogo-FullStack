import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, IsDecimal } from 'class-validator';

export class CreateProductRequest {

//VALIDACIONES PARA CREAR UN PRODUCTO

    //ID TIPO DE PRODUCTO
  @IsInt() //verifica que sea un entero
  productTypeId!: number; 

  //ID DESCUENTO (OPCIONAL)
  @IsOptional() //verifica que el campo es opcional
  @IsInt() //verifica que sea un entero
  discountId?: number; 

  //NOMBRE DEL PRODUCTO
  @IsString() //verifica que sea una cadena de texto
  @IsNotEmpty() //verifica que no esté vacío
  @MaxLength(100) //verifica que no exceda los 100 caracteres
  name!: string; 

  //PRECIO DEL PRODUCTO (OPCIONAL)
  @IsOptional() //verifica que el campo es opcional
  @IsDecimal() //verifica que sea decimal (string con formato decimal)
  price?: string; // decimal como string

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;

  // En base64, requerido en creación
  @IsString()
  imageBase64!: string;
}
