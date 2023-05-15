import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateHospitalDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({ required: false, example: { lat: 0.0, lng: 0.0 } })
  location: { lat: number; lng: number };
}
