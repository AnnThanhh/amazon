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
      username: userInfoDTO.username,
      email: userInfoDTO.email,
      password: hashedPassword,
      role: userInfoDTO.role,
    };

    return this.prismaService.users.create({ data: newData });
  }

  async findAll(): Promise<any> {
    return this.prismaService.users.findMany();
  }

  async findOne(id: number): Promise<any> {
    return this.prismaService.users.findUnique({ where: { id } });
  }

  async update(id: number, userInfoDTO: UserInfoDTO): Promise<any> {
    const hashedPassword = userInfoDTO.password
      ? bcrypt.hashSync(userInfoDTO.password, 10)
      : undefined;

    const newData = {
      username: userInfoDTO.username,
      email: userInfoDTO.email,
      password: hashedPassword,
      role: userInfoDTO.role,
      avatar: userInfoDTO.avatar
    };

    return this.prismaService.users.update({
      where: { id },
      data: newData,
    });
  }

  async remove(id: number): Promise<any> {
    return this.prismaService.users.delete({ where: { id } });
  }

  async searchUserInfoByName(username: string): Promise<any> {
    return this.prismaService.users.findMany({ where: { username } });
  }

  async uploadAvatar(id: number, url: string): Promise<any> {
    return this.prismaService.users.update({
      where: { id },
      data: { avatar: url },
    });
  }
}
