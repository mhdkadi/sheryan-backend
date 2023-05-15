import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumberString } from "class-validator";

export class FindCrossroadDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  page: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  limit: string;
}
