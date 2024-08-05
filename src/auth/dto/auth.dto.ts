import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
  
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  role: string;
}

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
