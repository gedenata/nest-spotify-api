import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MarketService } from './market.service';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';

@Controller('v1')
@ApiTags('Markets')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('markets')
  async getAvailableMarkets() {
    try {
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        throw new HttpException(data, status);
      } else {
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
