import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { MAX_POST_TITLE_CHARACTERS } from '../post.constants';

export enum CreateUpdatePostGroups {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export class CreateUpdatePostDto {
  @IsOptional({ groups: [CreateUpdatePostGroups.UPDATE] })
  @IsNotEmpty({
    groups: [CreateUpdatePostGroups.CREATE],
    message: 'title is required',
  })
  @IsString({
    groups: [CreateUpdatePostGroups.CREATE, CreateUpdatePostGroups.UPDATE],
    message: 'title should be a string',
  })
  @MaxLength(MAX_POST_TITLE_CHARACTERS, {
    groups: [CreateUpdatePostGroups.CREATE, CreateUpdatePostGroups.UPDATE],
    message: 'title max length is 60 characters',
  })
  title: string;

  @IsOptional({ groups: [CreateUpdatePostGroups.UPDATE] })
  @IsNotEmpty({
    groups: [CreateUpdatePostGroups.CREATE],
    message: 'content is required',
  })
  @IsString({
    groups: [CreateUpdatePostGroups.CREATE, CreateUpdatePostGroups.UPDATE],
    message: 'content should be a string',
  })
  content: string;
}
