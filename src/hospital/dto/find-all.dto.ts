import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class FindHospitalDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  _id?: string;
}
