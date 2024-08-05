import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDTO {
    @ApiProperty()
    user_id: number;

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