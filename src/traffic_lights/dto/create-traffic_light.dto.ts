import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrafficLightDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsArray()
  lights: Light[];
}
export interface Light {
  lat: Number;
  lng: Number;
}
