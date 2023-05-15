import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class FindOrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  user?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  paramedic?: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  page: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  limit: string;
}
