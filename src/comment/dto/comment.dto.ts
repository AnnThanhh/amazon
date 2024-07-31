import { OneToMany } from 'typeorm';
import { UserInfoDTO } from './../../user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/dto/product.dto';

export class Comment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  rating: number;

  @OneToMany(() => users)
  user: UserInfoDTO;

  @OneToMany()
  product: Product;
}
