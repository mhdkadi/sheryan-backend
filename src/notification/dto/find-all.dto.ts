import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class FindNotificationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  user?: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  page: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  limit: string;
}
