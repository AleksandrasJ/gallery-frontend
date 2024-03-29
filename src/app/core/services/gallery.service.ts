import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImageModel} from "../models/ImageModel";
import {ApiResponse} from "../models/ApiResponse";
import {FilterModel} from "../models/FilterModel";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {
  }

  public getAllImages(pageNumber: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`http://localhost:8080/api/gallery/image?page=${pageNumber}`);
  }

  public searchImages(pageNumber: number, keyword: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`http://localhost:8080/api/gallery/image/search/${keyword}?page=${pageNumber}`);
  }

  public filterImages(pageNumber: number, filter: FilterModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`http://localhost:8080/api/gallery/image/filter?page=${pageNumber}`, filter);
  }

  public getTagId(name: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/gallery/tag/${name}`);
  }

  public getImage(id: number): Observable<ImageModel> {
    return this.http.get<ImageModel>(`http://localhost:8080/api/gallery/image/${id}`);
  }

  public deleteImage(id: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/api/gallery/image/${id}`);
  }

  public uploadImage(info: any, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('information', new Blob([JSON.stringify(info)], {type: 'application/json'}));
    formData.append('image', new Blob([file], {type: file.type}));

    return this.http.post<string>(`http://localhost:8080/api/gallery/image`, formData);
  }

  public updateImage(id: number, info: ImageModel): Observable<string> {
    return this.http.put<string>(`http://localhost:8080/api/gallery/image/${id}`, info);
  }
}
