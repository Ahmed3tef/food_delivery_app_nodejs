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
export interface tokenInput {
  id: string;
  email: string;
}
export interface EditVendorInput {
  name: string;
  address: string;
  foodType: [string];
  phone: string;
}

export interface CreateDishInput {
  name: string;
  description: string;
  categoryId: string;
  vendorId: string;
  foodType: string;
  readyTime: string;
  price: number;
}
