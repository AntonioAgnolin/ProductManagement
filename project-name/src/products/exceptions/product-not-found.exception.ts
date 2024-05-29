import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor() {
    super('Produto não encontrado', HttpStatus.NOT_FOUND);
  }
}
