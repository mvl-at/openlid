import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Register} from "../common/model";
import {environment} from "../../environments/environment";
import {controllers} from "./controllers";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) {
  }

  getAllByRegisters(): Observable<Register[]> {
    return this.httpClient.get<Register[]>(`${environment.barrelUrl}${controllers.groupedMembers}`);
  }
}
