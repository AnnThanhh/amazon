import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async login(model: LoginDto) {
    const { userName, password } = model;

    const checkUserName = await this.prismaService.users.findFirst({
      where: {
        username: userName,
      },
    });
    if (checkUserName) {
      if (bcrypt.compareSync(password, checkUserName.password)) {
        let userId = { id: checkUserName.id };
        let token = this.jwtService.sign(userId, {
          expiresIn: '1d',
          algorithm: 'HS256',
          secret: 'BI_MAT',
        });
        return token;
      } else {
        return 'mật khẩu không đúng';
      }
    } else {
      return 'tên tài khoản không đúng';
    }
  }

  async signUp(model: SignUpDto): Promise<string> {
    const { userName, email, password } = model;
    const checkUserName = await this.prismaService.users.findFirst({
      where: {
        username: userName,
      },
    });

    if (checkUserName) {
      return 'Tên người dùng đã tồn tại';
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      username: userName,
      email,
      password: hashedPassword,
      role: 'USER',
    };

    await this.prismaService.users.create({
      data: newUser,
    });

    return 'Đăng ký thành công';
  }
}
