import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { ClaimHoldDeterValues } from '../api-models/claim-hold-deter-values';

@Injectable({
  providedIn: 'root'
})
export class ClaimHoldDeterValuesService {

  private claimHoldDeterValuesUrl: string = `${environment.apiUrl}/claimholddetervalueses`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient : HttpClient,
              private sharedService: SharedService) {
      this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
      this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getClaimHoldDeterValueses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimHoldDeterValues[]> {
      var url = `${this.claimHoldDeterValuesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
      return this.httpClient.get(url, {observe: 'response'})
          .pipe(map(response => response.body as ClaimHoldDeterValues[]),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getClaimHoldDeterValues(seqClhldRule : number): Observable<ClaimHoldDeterValues> {
      return this.httpClient.get(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, {observe: 'response'})
          .pipe(map(response => response.body as ClaimHoldDeterValues),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getClaimHoldDeterValuesesCount(): Observable<number> {
      var url = `${this.claimHoldDeterValuesUrl}/count`;
      return this.httpClient.get(url, {observe: 'response'})
          .pipe(map(response => response.body as number),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  createClaimHoldDeterValues(claimHoldDeterValues : ClaimHoldDeterValues): Observable<any> {
      let body = JSON.stringify(claimHoldDeterValues);
      return this.httpClient.post(this.claimHoldDeterValuesUrl, body, { headers: this.contentHeaders })
          .pipe(map(response => response),
               catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateClaimHoldDeterValues(claimHoldDeterValues : ClaimHoldDeterValues, seqClhldRule : number): Observable<any> {
      let body = JSON.stringify(claimHoldDeterValues);
      return this.httpClient.put(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
           .pipe(map(response => response),
               catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateClaimHoldDeterValues(claimHoldDeterValues : ClaimHoldDeterValues, seqClhldRule : number): Observable<any> {
      let body = JSON.stringify(claimHoldDeterValues);
      return this.httpClient.patch(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
          .pipe(map(response => response),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteClaimHoldDeterValues(determinantValueNo : number, determinantColumnNo: number, seqClhldRule: number): Observable<any> {
    return this.httpClient.delete(`${this.claimHoldDeterValuesUrl}/${determinantValueNo}/${determinantColumnNo}/${seqClhldRule}`, {observe: 'response'})
        .pipe(map(response => response.body),
            catchError((error: any) => {
                   return this.sharedService.handleError(error)
               }))
}

   getClaimHoldDeterValuesesByColumnNoAndSeqClhldRule(determinantColumnNo:any,seqClhldRule:any): Observable<ClaimHoldDeterValues[]> {
     var url = `${this.claimHoldDeterValuesUrl}/claimholdvalues/${determinantColumnNo}/${seqClhldRule}`;
     return this.httpClient.get(url, {observe: 'response'})
         .pipe(map(response => response.body as ClaimHoldDeterValues[]),
             catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
 }
 
 addUpdateClaimHoldDeterValues(claimHoldDeterValues: ClaimHoldDeterValues[]): Observable<any> {
    let body = JSON.stringify(claimHoldDeterValues);
    const url = `${this.claimHoldDeterValuesUrl}/update`
    return this.httpClient.post(url, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
            catchError(this.sharedService.handleError));
}

}
