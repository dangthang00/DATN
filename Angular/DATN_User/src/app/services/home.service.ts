import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  readonly APIUrl="http://localhost:10282/api";
  constructor(private http:HttpClient) { }

  getAllSP():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/sanpham/getAll')
  }

  getloaisp():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/maloai/search')
  }

  getidsp(id:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/sanpham/get-by-id/'+id)
  }

  getSpmoi():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/home/get-sp-moi')
  }
  getGiaban():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/home/get-giaban')
  }
  getSoLuong():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/home/get-soluong')
  }
  gettintuc():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/tintuc/getAll')
  }
  getmail():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/mail/sendemail')
  }

}

