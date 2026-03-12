import { IsString, IsDateString, IsCuid } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateReservationDto {
  @ApiProperty() @IsString() roomId: string;
  @ApiProperty() @IsDateString() checkIn: string;
  @ApiProperty() @IsDateString() checkOut: string;
}
