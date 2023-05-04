export interface createVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  logo: string;
}
export interface loginInput {
  email: string;
  password: string;
}
