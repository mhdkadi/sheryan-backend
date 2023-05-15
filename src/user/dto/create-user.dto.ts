import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  fcmToken?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  accountType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  hospital?: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ example: { lat: 0.0, lng: 0.0 } })
  location?: { lat: number; lng: number };
}
