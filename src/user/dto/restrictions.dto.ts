import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class RestrictionsDto {
  @ApiProperty({
    description:
      "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content. Additional reasons may be added in the future.",
    enum: ['market', 'product', 'explicit'],
  })
  @IsEnum(['market', 'product', 'explicit'])
  reason: string;
}
