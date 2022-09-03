import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICategory } from "../models/ICategory";

@Injectable({
    providedIn:'root'
})
export class CategoryService {
  baseUrl = `https://e-commerceapp-fb599-default-rtdb.firebaseio.com/`;
  constructor(private http: HttpClient) {}
    addCategory(category: ICategory):Observable<{name:string}> {
    return this.http.post<{name:string}>(`${this.baseUrl}categories.json`,category)
    }
    
    getCategories():Observable<ICategory[]> {
        return this.http
          .get<{ [id: string]: ICategory }[]>(`${this.baseUrl}categories.json`)
          .pipe(
            map((categories) => {
              let formattedCategories: ICategory[] = [];
              for (let id in categories) {
                formattedCategories.push({
                  id,
                  ...categories[id],
                } as ICategory);
              }
              return formattedCategories;
            })
          );
    }
}