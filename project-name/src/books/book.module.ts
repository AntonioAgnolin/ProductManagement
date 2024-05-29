import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './services/book.service';
import { BooksController } from './controller/book.controller';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}