import { IsNotEmpty, IsBoolean, IsNumber, IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNestAppDto {
    @ApiProperty({
        description: 'The name of user',
    })
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    readonly name: string;

    @ApiProperty({
        description: ' the id of user',
    })
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    readonly id: number;

    @ApiProperty({
        description:'is exist or not',
    })
    @IsBoolean()
    @IsNotEmpty()
    @IsDefined()
    readonly Exist: boolean;
}