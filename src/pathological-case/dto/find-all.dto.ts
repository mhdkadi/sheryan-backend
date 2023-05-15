import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class FindPathologicalCaseDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  limit: number;
}
