export class CardModel {
  id: number;
  manufacturer: string;
  type: string;
  productionYear: number;
  topSpeed: number;
  horsePower: number;
  displacement: number;
  description: string;
  imageUrl?: string;

  constructor(
    id: number,
    manufacturer: string,
    type: string,
    productionYear: number,
    topSpeed: number,
    horsePower: number,
    displacement: number,
    description: string,
    imageUrl?: string
  ) {
    this.id = id;
    this.manufacturer = manufacturer;
    this.type = type;
    this.productionYear = productionYear;
    this.topSpeed = topSpeed;
    this.horsePower = horsePower;
    this.displacement = displacement;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
