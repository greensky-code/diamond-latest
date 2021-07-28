/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcedureDeterminant } from '../api-models/procedure-determinant.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProcedureDeterminantService {
  private procedureDeterminantUrl: string = `${environment.apiUrl}/proceduredeterminants`;
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

  getProcedureDeterminants(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<ProcedureDeterminant[]> {
    var url = `${this.procedureDeterminantUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as ProcedureDeterminant[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getProcedureDeterminant(
    procedureCode: string
  ): Observable<ProcedureDeterminant> {
    return this.httpClient
      .get(`${this.procedureDeterminantUrl}/${procedureCode}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ProcedureDeterminant),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getProcedureDeterminantsCount(): Observable<number> {
    var url = `${this.procedureDeterminantUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  findByProcedureCode(
    procedureCode: string
  ): Observable<ProcedureDeterminant[]> {
    return this.httpClient
      .get(
        `${this.procedureDeterminantUrl}/find-by-procedurecode/${procedureCode}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as ProcedureDeterminant[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  createProcedureDeterminant(
    procedureDeterminant: ProcedureDeterminant
  ): Observable<any> {
    let body = JSON.stringify(procedureDeterminant);
    return this.httpClient
      .post(this.procedureDeterminantUrl, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateProcedureDeterminant(
    procedureDeterminant: ProcedureDeterminant,
    procedureCode: string
  ): Observable<any> {
    let body = JSON.stringify(procedureDeterminant);
    return this.httpClient
      .put(`${this.procedureDeterminantUrl}/${procedureCode}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateProcedureDeterminant(
    procedureDeterminant: ProcedureDeterminant,
    procedureCode: string
  ): Observable<any> {
    let body = JSON.stringify(procedureDeterminant);
    return this.httpClient
      .patch(`${this.procedureDeterminantUrl}/${procedureCode}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteProcedureDeterminant(procedureCode: string): Observable<any> {
    return this.httpClient
      .delete(`${this.procedureDeterminantUrl}/${procedureCode}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
       addUpdateProcedureCode(procedureDer: ProcedureDeterminant[]): Observable<any> {
        let body = JSON.stringify(procedureDer);
        const url = `${this.procedureDeterminantUrl}/updateProDetRecords`;
        return this.httpClient
          .post(url, body, { headers: this.contentHeaders })
          .pipe(
            map((response) => response),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
          );
  }
}
