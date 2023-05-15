import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCrossroadDto {
  @IsNotEmpty()
  @ApiProperty({ example: [] })
  trafficLites: any;
}
