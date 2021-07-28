import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CiebAddressCommentHistory, CiebAddressOtherInfo } from '../../api-models';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CiebAddressOtherInfoService {

  private ciebAddressOtherInfoUrl = `${environment.apiUrl}/ciebaddressotherinfo`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getCiebAddressOtherInfo(seqEntityId: number): Observable<CiebAddressOtherInfo> {
    return this.httpClient.get(`${this.ciebAddressOtherInfoUrl}/${seqEntityId}`, { observe: 'response' })
      .pipe(map(response => response.body as CiebAddressOtherInfo),
        catchError((error: any) => {
          return this.sharedService.handleError(error)
        }));
  }

  getCiebAddressCommentHistory(seqEntityId: number): Observable<CiebAddressCommentHistory[]> {
    return this.httpClient.get(`${this.ciebAddressOtherInfoUrl}/histories/${seqEntityId}`, { observe: 'response' })
      .pipe(map(response => response.body as CiebAddressCommentHistory[]),
        catchError((error: any) => {
          return this.sharedService.handleError(error)
        }));
  }

  createUpdateCiebAddressOtherInfo(ciebAddressOtherInfo: CiebAddressOtherInfo): Observable<any> {
    let body = JSON.stringify(ciebAddressOtherInfo);
    return this.httpClient.post(this.ciebAddressOtherInfoUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error)
        }));
  }
}
