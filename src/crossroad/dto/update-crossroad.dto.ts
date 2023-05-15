import { PartialType } from "@nestjs/swagger";

import { CreateCrossroadDto } from "./create-crossroad.dto";

export class UpdateCrossroadDto extends PartialType(CreateCrossroadDto) {}
