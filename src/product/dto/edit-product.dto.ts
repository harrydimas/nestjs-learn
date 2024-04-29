import { ApiProperty } from "@nestjs/swagger";

export class EditProductDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    isActive: boolean;
}