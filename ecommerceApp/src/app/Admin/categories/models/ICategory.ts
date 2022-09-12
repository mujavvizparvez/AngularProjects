export interface ICategory {
  id?: string;
  name: string;
  type: string;
  photoUrl: string;
  description: string;
  createdBy: number;
  createdDate: Date;
  updatedBy?: number;
  updatedDate?: Date;
}
