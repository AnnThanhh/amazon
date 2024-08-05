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
    const { email, password } = model;

    const checkEmail = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      if (bcrypt.compareSync(password, checkEmail.password)) {
        let userId = { id: checkEmail.user_id };
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
    const { name, email, password } = model;
    const checkEmail = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return 'Tên người dùng đã tồn tại';
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      name,
      password: hashedPassword,
      email,
      phone: '',
      avatar: '',
      role: 'USER',
    };

    await this.prismaService.users.create({
      data: newUser,
    });

    return 'Đăng ký thành công';
  }
}
