import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInfoDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(userInfoDTO: UserInfoDTO): Promise<any> {
    const checkEmail = await this.prismaService.users.findFirst({
      where: { email: userInfoDTO.email },
    });

    if (checkEmail) {
      return 'Email đã tồn tại';
    }

    const hashedPassword = bcrypt.hashSync(userInfoDTO.password, 10);
    const newData = {
      name: userInfoDTO.name,
      password: hashedPassword,
      email: userInfoDTO.email,
      phone: userInfoDTO.phone,
      avatar: userInfoDTO.avatar,
      role: userInfoDTO.role,
    };

    return this.prismaService.users.create({ data: newData });
  }

  async findAll(): Promise<any> {
    return this.prismaService.users.findMany();
  }

  async findOne(user_id: number): Promise<any> {
    return this.prismaService.users.findUnique({ where: { user_id } });
  }

  async update(user_id: number, userInfoDTO: UserInfoDTO): Promise<any> {
    const hashedPassword = userInfoDTO.password
      ? bcrypt.hashSync(userInfoDTO.password, 10)
      : undefined;

    const newData = {
      name: userInfoDTO.name,
      password: hashedPassword,
      email: userInfoDTO.email,
      phone: userInfoDTO.phone,
      avatar: userInfoDTO.avatar,
      role: userInfoDTO.role,
    };

    return this.prismaService.users.update({
      where: { user_id },
      data: newData,
    });
  }

  async remove(user_id: number): Promise<any> {
    return this.prismaService.users.delete({ where: { user_id } });
  }

  async searchUserInfoByName(name: string): Promise<any> {
    return this.prismaService.users.findMany({ where: { name } });
  }

  async uploadAvatar(user_id: number, url: string): Promise<any> {
    return this.prismaService.users.update({
      where: { user_id },
      data: { avatar: url },
    });
  }
}
