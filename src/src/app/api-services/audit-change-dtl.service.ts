import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuditChangeDtl } from '../api-models/audit-change-dtl.model'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuditChangeDtlService {

  private auditChangeDtlUrl: string = `${environment.apiUrl}/auditchangedtls`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient : HttpClient,
              private sharedService: SharedService) {
      this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
      this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getAuditChangeDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuditChangeDtl[]> {
      var url = `${this.auditChangeDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
      return this.httpClient.get(url, {observe: 'response'})
          .pipe(map(response => response.body as AuditChangeDtl[]),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getAuditChangeDtl(seqAuditId : number): Observable<AuditChangeDtl> {
      return this.httpClient.get(`${this.auditChangeDtlUrl}/${seqAuditId}`, {observe: 'response'})
          .pipe(map(response => response.body as AuditChangeDtl),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getAuditChangeDtlsCount(): Observable<number> {
      var url = `${this.auditChangeDtlUrl}/count`;
      return this.httpClient.get(url, {observe: 'response'})
          .pipe(map(response => response.body as number),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findBySeqAuditId(seqAuditId : number): Observable<AuditChangeDtl[]> {
      return this.httpClient.get(`${this.auditChangeDtlUrl}/find-by-seqauditid/${seqAuditId}`, {observe: 'response'})
          .pipe(map(response => response.body as AuditChangeDtl),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }




  createAuditChangeDtl(auditChangeDtl : AuditChangeDtl): Observable<any> {
      let body = JSON.stringify(auditChangeDtl);
      return this.httpClient.post(this.auditChangeDtlUrl, body, { headers: this.contentHeaders })
          .pipe(map(response => response),
               catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateAuditChangeDtl(auditChangeDtl : AuditChangeDtl, seqAuditId : number): Observable<any> {
      let body = JSON.stringify(auditChangeDtl);
      return this.httpClient.put(`${this.auditChangeDtlUrl}/${seqAuditId}`, body, { headers: this.contentHeaders })
           .pipe(map(response => response),
               catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateAuditChangeDtl(auditChangeDtl : AuditChangeDtl, seqAuditId : number): Observable<any> {
      let body = JSON.stringify(auditChangeDtl);
      return this.httpClient.patch(`${this.auditChangeDtlUrl}/${seqAuditId}`, body, { headers: this.contentHeaders })
          .pipe(map(response => response),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteAuditChangeDtl(seqAuditId : number): Observable<any> {
      return this.httpClient.delete(`${this.auditChangeDtlUrl}/${seqAuditId}`, {observe: 'response'})
          .pipe(map(response => response.body),
              catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
