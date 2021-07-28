import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { ClaimHoldRules } from '../api-models/claim-hold-rules';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimHoldRulesService {

  private claimHoldRulesUrl: string = `${environment.apiUrl}/claimholdruleses`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient : HttpClient,
              private sharedService: SharedService) {
      this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
      this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getClaimHoldRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimHoldRules[]> {
      var url = `${this.claimHoldRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
      return this.httpClient.get(url, {observe: 'response'})
          .pipe(map(response => response.body as ClaimHoldRules[]),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findAllClaimHoldRules(): Observable<any[]> {
    var url = `${this.claimHoldRulesUrl}/findAllClaimHoldRules`;
    return this.httpClient.get(url, {observe: 'response'}).pipe(map(response => response.body as any[]),catchError(this.sharedService.handleError))
  }

  getClaimHoldRules(seqClhldRule : number): Observable<ClaimHoldRules> {
      return this.httpClient.get(`${this.claimHoldRulesUrl}/${seqClhldRule}`, {observe: 'response'})
          .pipe(map(response => response.body as ClaimHoldRules),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getClaimHoldRulesesCount(): Observable<number> {
      var url = `${this.claimHoldRulesUrl}/count`;
      return this.httpClient.get(url, {observe: 'response'})
          .pipe(map(response => response.body as number),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findByReasonCode(reasonCode : string): Observable<ClaimHoldRules[]> {
      return this.httpClient.get(`${this.claimHoldRulesUrl}/find-by-reasoncode/${reasonCode}`, {observe: 'response'})
          .pipe(map(response => response.body as ClaimHoldRules),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  createClaimHoldRules(claimHoldRules : ClaimHoldRules): Observable<any> {
      let body = JSON.stringify(claimHoldRules);
      return this.httpClient.post(this.claimHoldRulesUrl, body, { headers: this.contentHeaders })
          .pipe(map(response => response),
               catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateClaimHoldRules(claimHoldRules : ClaimHoldRules, seqClhldRule : number): Observable<any> {
      let body = JSON.stringify(claimHoldRules);
      return this.httpClient.put(`${this.claimHoldRulesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
           .pipe(map(response => response),
               catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateClaimHoldRules(claimHoldRules : ClaimHoldRules, seqClhldRule : number): Observable<any> {
      let body = JSON.stringify(claimHoldRules);
      return this.httpClient.patch(`${this.claimHoldRulesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
          .pipe(map(response => response),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteClaimHoldRules(seqClhldRule : number): Observable<any> {
      return this.httpClient.delete(`${this.claimHoldRulesUrl}/deleteClaimHoldRules/${seqClhldRule}`, {observe: 'response'})
          .pipe(map(response => response.body),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  
}
