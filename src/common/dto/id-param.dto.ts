import { IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID(undefined, { message: 'The id must be a valid UUID.' })
  id: string;
}
