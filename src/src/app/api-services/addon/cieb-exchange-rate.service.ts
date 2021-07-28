import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { CiebExchangeRate } from '../../api-models/addon/cieb-exchange-rate.model';
import { EntityHeader } from '../../api-models/addon/entity-header.model';
import { SharedService } from '../../shared/services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class CiebExchangeRateService {

  
  private ciebExchangeRateUrl: string = `${environment.apiUrl}/ciebexchangerates`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient : HttpClient,
              private sharedService: SharedService) {
      this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
      this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getExchangeRateByDate(seqGroupId:number , dateValid:any , currencyCode:string ){
    return this.httpClient
    .get(`${this.ciebExchangeRateUrl}/${dateValid}/${seqGroupId}/${currencyCode}`, {
      observe: "response",
    })
    .pipe(
      map((response) => response.body as CiebExchangeRate),
      catchError(this.sharedService.handleError)
    );

  }


}
