import { diskStorage } from 'multer';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put, UseInterceptors, Req, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { users } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UserInfoDTO } from './dto/user.dto';
import { FilesUploadDto } from 'src/file/file-upload.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/get-users")
  findAll(): Promise<users[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/create-user")
  @Post()
  create(@Body() userInfoDTO: UserInfoDTO) {
    return this.userService.create(userInfoDTO);
  }

  @Get("/get-user-info/:id")
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/delele-user/:id")
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/update-user-info/:id")
  updateUserInfo(@Param("id", ParseIntPipe) id: number, @Body() userInfoDTO: UserInfoDTO) {
    return this.userService.update(id, userInfoDTO)
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FilesUploadDto,
  })
  @UseInterceptors(FilesInterceptor("file", 1, {
    storage: diskStorage({
      destination: process.cwd() + "/public/img/avt",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload-avatar")
  uploadAvatar(@Req() req, @UploadedFiles() files: Express.Multer.File[]) {
    const id = req.user.id
    const file = files[0]
    const url = `/public/img/avt/{file.filename}`
    return this.userService.uploadAvatar(id, url);
  }
}
