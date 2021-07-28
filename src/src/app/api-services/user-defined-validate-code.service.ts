import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { UserDefinedValidateCode } from '../api-models/user-defined-validate-code';


@Injectable({
  providedIn: 'root'
})
export class UserDefinedValidateCodeService {

  private userDefinedValidateCodeUrll: string = `${environment.apiUrl}/userdefinedvaldtcodes`;
  private contentHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }


  getUserDefinedValidateCode(validatedTableName: string, validatedColumnName: string): Observable<any> {
    return this.httpClient.get(`${this.userDefinedValidateCodeUrll}/${validatedTableName}/${validatedColumnName}`, { observe: 'response' })
      .pipe(map(response => response.body as UserDefinedValidateCode[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

}
