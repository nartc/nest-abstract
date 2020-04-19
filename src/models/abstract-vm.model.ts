import { ApiPropertyOptional } from '@nestjs/swagger';

export class AbstractVm {
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: Date;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  updatedAt?: Date;

  @ApiPropertyOptional() id?: string;
}
