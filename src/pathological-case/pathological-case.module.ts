import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PathologicalCaseService } from "./pathological-case.service";
import { PathologicalCaseController } from "./pathological-case.controller";
import {
  PathologicalCase,
  PathologicalCaseSchema,
} from "./entities/pathological-case.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PathologicalCase.name, schema: PathologicalCaseSchema },
    ]),
  ],
  controllers: [PathologicalCaseController],
  providers: [PathologicalCaseService],
})
export class PathologicalCaseModule {}
