import { ApiProperty } from "@nestjs/swagger";

export class AddProductDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
}