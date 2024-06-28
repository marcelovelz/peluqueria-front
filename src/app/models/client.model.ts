export interface Client {
  id: number;
  identificationNumber: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
