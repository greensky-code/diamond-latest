/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcedureCodeMasterArc } from '../api-models/procedure-code-master-arc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProcedureCodeMasterArcService {
  private procedureCodeMasterArcUrl: string = `${environment.apiUrl}/procedurecodemasterarcs`;
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

  getProcedureCodeMasterArcs(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<ProcedureCodeMasterArc[]> {
    var url = `${this.procedureCodeMasterArcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as ProcedureCodeMasterArc[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getProcedureCodeMasterArc(
    seqProcChangeId: number
  ): Observable<ProcedureCodeMasterArc> {
    return this.httpClient
      .get(`${this.procedureCodeMasterArcUrl}/${seqProcChangeId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ProcedureCodeMasterArc),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getProcedureCodeMasterArcsCount(): Observable<number> {
    var url = `${this.procedureCodeMasterArcUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  findByHoldReason(holdReason: string): Observable<ProcedureCodeMasterArc[]> {
    return this.httpClient
      .get(
        `${this.procedureCodeMasterArcUrl}/find-by-holdreason/${holdReason}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as ProcedureCodeMasterArc),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  createProcedureCodeMasterArc(
    procedureCodeMasterArc: ProcedureCodeMasterArc
  ): Observable<any> {
    let body = JSON.stringify(procedureCodeMasterArc);
    return this.httpClient
      .post(this.procedureCodeMasterArcUrl, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateProcedureCodeMasterArc(
    procedureCodeMasterArc: ProcedureCodeMasterArc,
    seqProcChangeId: number
  ): Observable<any> {
    let body = JSON.stringify(procedureCodeMasterArc);
    return this.httpClient
      .put(`${this.procedureCodeMasterArcUrl}/${seqProcChangeId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateProcedureCodeMasterArc(
    procedureCodeMasterArc: ProcedureCodeMasterArc,
    seqProcChangeId: number
  ): Observable<any> {
    let body = JSON.stringify(procedureCodeMasterArc);
    return this.httpClient
      .patch(`${this.procedureCodeMasterArcUrl}/${seqProcChangeId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteProcedureCodeMasterArc(seqProcChangeId: number): Observable<any> {
    return this.httpClient
      .delete(`${this.procedureCodeMasterArcUrl}/${seqProcChangeId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByProcedureCode(
    procedureCode: string
  ): Observable<ProcedureCodeMasterArc[]> {
    return this.httpClient
      .get(
        `${this.procedureCodeMasterArcUrl}/find-by-procedurecode/${procedureCode}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as ProcedureCodeMasterArc[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
}
