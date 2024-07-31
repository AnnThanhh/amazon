import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    avatar: string;
}