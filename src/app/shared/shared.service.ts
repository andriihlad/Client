import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths, environment } from 'src/environments/environment.prod';
import { CategoryModel } from '../models/category.model';
import { SizeModel } from '../models/size.model';
import { StatusModel } from '../models/status.model';

@Injectable() 
export class SharedService {
    constructor(private http: HttpClient) {}
  
    getCategories(params: string){
        return this.http.get<CategoryModel[]>(environment.baseUrl+ApiPaths.Categories+ params)
    }
    getSizes(params: string) {
        return this.http.get<SizeModel[]>(environment.baseUrl+ApiPaths.Sizes+ params)
    }
    getStatuses(params: string){
        return this.http.get<StatusModel[]>(environment.baseUrl+ApiPaths.Statuses + params)
    }
}