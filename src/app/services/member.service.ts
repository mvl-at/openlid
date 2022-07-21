import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Crew} from "../common/member";
import {environment} from "../../environments/environment";
import {controllers} from "./controllers";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) {
  }

  getAllByRegisters(): Observable<Crew> {
    return this.httpClient.get<Crew>(`${environment.barrelUrl}${controllers.members.root}`);
  }
}
