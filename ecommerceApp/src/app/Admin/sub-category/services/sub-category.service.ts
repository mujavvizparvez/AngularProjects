import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISubCategory } from '../models/ISubCatetogory';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  baseUrl = `https://e-commerceapp-fb599-default-rtdb.firebaseio.com/`;
  constructor(private http: HttpClient) {}

  getSubCategories(): Observable<ISubCategory[]> {
    return this.http
      .get<{ [id: string]: ISubCategory }[]>(
        `${this.baseUrl}subCategories.json`
      )
      .pipe(
        map((subCategories) => {
          let formattedSubCategories: ISubCategory[] = [];
          for (let id in subCategories) {
            formattedSubCategories.push({
              id,
              ...subCategories[id],
            } as ISubCategory);
          }
          return formattedSubCategories;
        })
      );
  }

  addSubCategory(subCategory: ISubCategory): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${this.baseUrl}subCategories.json`,
      subCategory
    );
  }
    getSubCategoryById(id:string):Observable<ISubCategory> {
      return this.http.get<ISubCategory>(`${this.baseUrl}subCategories/${id}.json`)
  }
    updateSubcategory(subCategory:ISubCategory,id:string) {
        return this.http.put(`${this.baseUrl}subCategories/${id}.json`,subCategory)
    }
     
    deleteSubCategory(id:string) {
        return this.http.delete(`${this.baseUrl}subCategories/${id}.json`)
    }
}
