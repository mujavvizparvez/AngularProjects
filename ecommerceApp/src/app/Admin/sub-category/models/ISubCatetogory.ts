export interface ISubCategory {
  category: string | null;
  id?: string;
  name: string;
  photoUrl: string;
    type: string;
  categoryId: string;
  categoryName: string;
  description: string;
  createdBy?: number;
  createdDate?: Date;
  updatedBy?: number;
  updatedDate?: Date;
}
