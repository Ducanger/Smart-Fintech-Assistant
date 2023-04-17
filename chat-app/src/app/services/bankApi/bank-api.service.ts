import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BankApiService {
  constructor(private http: HttpClient) {}

  getAccountInfo(): Observable<any> {
    return this.http.get("https://api.example.com/data");
  }

  getBankList(): Observable<any> {
    return this.http.get("https://api.vietqr.io/v2/banks");
  }
}
