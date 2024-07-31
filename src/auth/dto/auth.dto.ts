import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}
