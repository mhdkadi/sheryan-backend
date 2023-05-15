import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePathologicalCaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  level: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
