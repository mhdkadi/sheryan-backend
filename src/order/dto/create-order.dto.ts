import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  level: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ example: { lat: 0.0, lng: 0.0 } })
  location: { lat: number; lng: number };

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  user: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  pathologicalCase: string;
}
