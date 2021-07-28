/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClmDtlAuthProcLnkHdr } from '../api-models/clm-dtl-auth-proc-lnk-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClmDtlAuthProcLnkHdrService {
  private clmDtlAuthProcLnkHdrUrl: string = `${environment.apiUrl}/clmdtlauthproclnkhdrs`;
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

  getClmDtlAuthProcLnkHdrs(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<ClmDtlAuthProcLnkHdr[]> {
    var url = `${this.clmDtlAuthProcLnkHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as ClmDtlAuthProcLnkHdr[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getClmDtlAuthProcLnkHdr(
    seqCdaplHdr: number
  ): Observable<ClmDtlAuthProcLnkHdr> {
    return this.httpClient
      .get(`${this.clmDtlAuthProcLnkHdrUrl}/${seqCdaplHdr}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ClmDtlAuthProcLnkHdr),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getClmDtlAuthProcLnkHdrsCount(): Observable<number> {
    var url = `${this.clmDtlAuthProcLnkHdrUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  createClmDtlAuthProcLnkHdr(
    clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr
  ): Observable<any> {
    let body = JSON.stringify(clmDtlAuthProcLnkHdr);

    return this.httpClient
      .post(this.clmDtlAuthProcLnkHdrUrl, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateClmDtlAuthProcLnkHdr(
    clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr,
    seqCdaplHdr: number
  ): Observable<any> {
    let body = JSON.stringify(clmDtlAuthProcLnkHdr);
    return this.httpClient
      .put(`${this.clmDtlAuthProcLnkHdrUrl}/${seqCdaplHdr}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateClmDtlAuthProcLnkHdr(
    clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr,
    seqCdaplHdr: number
  ): Observable<any> {
    let body = JSON.stringify(clmDtlAuthProcLnkHdr);
    return this.httpClient
      .patch(`${this.clmDtlAuthProcLnkHdrUrl}/${seqCdaplHdr}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteClmDtlAuthProcLnkHdr(seqCdaplHdr: number): Observable<any> {
    return this.httpClient
      .delete(`${this.clmDtlAuthProcLnkHdrUrl}/${seqCdaplHdr}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getByLineOfBusinessAndAuthType(
    lineOfBusiness: string,
    authType: string
  ): Observable<ClmDtlAuthProcLnkHdr[]> {
    return this.httpClient
      .get(
        `${this.clmDtlAuthProcLnkHdrUrl}/find/${lineOfBusiness}/${authType}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as ClmDtlAuthProcLnkHdr[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  checkLob(lineOfBusiness: string): Observable<ClmDtlAuthProcLnkHdr[]> {
    return this.httpClient
      .get(`${this.clmDtlAuthProcLnkHdrUrl}/findByLob/${lineOfBusiness}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ClmDtlAuthProcLnkHdr[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  checkAuthType(
    authType: string
  ): Observable<ClmDtlAuthProcLnkHdr[]> {
    return this.httpClient
      .get(`${this.clmDtlAuthProcLnkHdrUrl}/findByAuthType/${authType}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ClmDtlAuthProcLnkHdr[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
}
