/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClmDtlAuthProcLnkDtl } from '../api-models/clm-dtl-auth-proc-lnk-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClmDtlAuthProcLnkDtlService {
  private clmDtlAuthProcLnkDtlUrl: string = `${environment.apiUrl}/clmdtlauthproclnkdtls`;
  private procedureUrl: String = `${environment.apiUrl}/spcheckcdaplexists`;
  private contentHeaders = new HttpHeaders();
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
    this.contentHeaders = this.contentHeaders.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  getClmDtlAuthProcLnkDtls(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<ClmDtlAuthProcLnkDtl[]> {
    var url = `${this.clmDtlAuthProcLnkDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as ClmDtlAuthProcLnkDtl[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getClmDtlAuthProcLnkDtl(
    seqCdaplHdr: number
  ): Observable<ClmDtlAuthProcLnkDtl[]> {
    return this.httpClient
      .get(`${this.clmDtlAuthProcLnkDtlUrl}/${seqCdaplHdr}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ClmDtlAuthProcLnkDtl[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getClmDtlAuthProcLnkDtlsCount(): Observable<number> {
    var url = `${this.clmDtlAuthProcLnkDtlUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  createClmDtlAuthProcLnkDtl(
    clmDtlAuthProcLnkDtl: ClmDtlAuthProcLnkDtl
  ): Observable<any> {
    let body = JSON.stringify(clmDtlAuthProcLnkDtl);
    return this.httpClient
      .post(this.clmDtlAuthProcLnkDtlUrl, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateClmDtlAuthProcLnkDtl(
    clmDtlAuthProcLnkDtl: ClmDtlAuthProcLnkDtl,
    seqCdaplHdr: number
  ): Observable<any> {
    let body = JSON.stringify(clmDtlAuthProcLnkDtl);
    return this.httpClient
      .put(`${this.clmDtlAuthProcLnkDtlUrl}/${seqCdaplHdr}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateClmDtlAuthProcLnkDtl(
    clmDtlAuthProcLnkDtl: ClmDtlAuthProcLnkDtl,
    seqCdaplHdr: number
  ): Observable<any> {
    let body = JSON.stringify(clmDtlAuthProcLnkDtl);
    return this.httpClient
      .patch(`${this.clmDtlAuthProcLnkDtlUrl}/${seqCdaplHdr}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteClmDtlAuthProcLnkDtl(seqCdaplHdr: number): Observable<any> {
    return this.httpClient
      .delete(`${this.clmDtlAuthProcLnkDtlUrl}/${seqCdaplHdr}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findbyseqcdaplhdr(seqCdaplHdr: number): Observable<ClmDtlAuthProcLnkDtl[]> {
    return this.httpClient
      .get(
        `${this.clmDtlAuthProcLnkDtlUrl}/find-by-seqcdaplhdr/${seqCdaplHdr}`,
        {
          observe: "response",
        }
      )
      .pipe(
        map((response) => response.body as ClmDtlAuthProcLnkDtl[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateClaimsRecord(claims: ClmDtlAuthProcLnkDtl[]): Observable<any> {
    let body = JSON.stringify(claims);
    const url = `${this.clmDtlAuthProcLnkDtlUrl}/updateClaimsRecord`;
    return this.httpClient
      .post(url, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  callProcedure(data: any): Observable<any> {
    let body = JSON.stringify(data);
    return this.httpClient
      .post(`${environment.apiUrl}/spcheckcdaplexists`, body, {
        headers: this.contentHeaders,
      })
      .pipe(catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }
}
