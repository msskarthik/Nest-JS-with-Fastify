import { PartialType } from '@nestjs/mapped-types';
import { CreateNestAppDto } from './nestApp.dto';

export class UpdateNestDto extends PartialType(CreateNestAppDto) {}