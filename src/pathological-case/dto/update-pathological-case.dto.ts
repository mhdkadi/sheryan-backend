import { PartialType } from '@nestjs/swagger';
import { CreatePathologicalCaseDto } from './create-pathological-case.dto';

export class UpdatePathologicalCaseDto extends PartialType(CreatePathologicalCaseDto) {}
