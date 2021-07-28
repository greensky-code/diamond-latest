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
import { AuditHdr } from '../api-models/audit-hdr';

@Injectable({
  providedIn: 'root'
})
export class AuditHdrService {

  private auditHdrUrl: string = `${environment.apiUrl}/audithdrs`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getAuditHdrs(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<AuditHdr[]> {
    var url = `${this.auditHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as AuditHdr[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getAuditHdr(seqAuditId: number): Observable<AuditHdr> {
    return this.httpClient.get(`${this.auditHdrUrl}/${seqAuditId}`, { observe: 'response' })
      .pipe(map(response => response.body as AuditHdr),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getAuditHdrsCount(): Observable<number> {
    var url = `${this.auditHdrUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  createAuditHdr(auditHdr: AuditHdr): Observable<any> {
    let body = JSON.stringify(auditHdr);
    return this.httpClient.post(this.auditHdrUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateAuditHdr(auditHdr: AuditHdr, seqAuditId: number): Observable<any> {
    let body = JSON.stringify(auditHdr);
    return this.httpClient.put(`${this.auditHdrUrl}/${seqAuditId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateAuditHdr(auditHdr: AuditHdr, seqAuditId: number): Observable<any> {
    let body = JSON.stringify(auditHdr);
    return this.httpClient.patch(`${this.auditHdrUrl}/${seqAuditId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteAuditHdr(seqAuditId: number): Observable<any> {
    return this.httpClient.delete(`${this.auditHdrUrl}/${seqAuditId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getAuditHdrsByAuditedRecordKeyAndKeyword(auditedRecordKey: string, Keyword: string): Observable<AuditHdr[]> {
    var url = `${this.auditHdrUrl}/${auditedRecordKey}/${Keyword}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as AuditHdr[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

}
