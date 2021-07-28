/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebProvince } from "../../api-models";
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class CiebProvinceService {
  private ciebProvinceUrl: string = `${environment.apiUrl}/ciebprovinces`;
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

  getCiebProvinces(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<CiebProvince[]> {
    var url = `${this.ciebProvinceUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as CiebProvince[]),
      catchError(this.sharedService.handleError)
    );
  }

  getCiebProvince(stateCode: string): Observable<CiebProvince> {
    return this.httpClient
      .get(`${this.ciebProvinceUrl}/${stateCode}`, { observe: "response" })
      .pipe(
        map((response) => response.body as CiebProvince),
        catchError(this.sharedService.handleError)
      );
  }

  findbyCountryCode(countryCode: string): Observable<CiebProvince[]> {
    return this.httpClient
      .get(`${this.ciebProvinceUrl}/findbyCountryCode/${countryCode}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as CiebProvince[]),
        catchError(this.sharedService.handleError)
      );
  }

  getCiebProvincesCount(): Observable<number> {
    var url = `${this.ciebProvinceUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError(this.sharedService.handleError)
    );
  }

  createCiebProvince(ciebProvince: CiebProvince): Observable<any> {
    let body = JSON.stringify(ciebProvince);
    return this.httpClient
      .post(this.ciebProvinceUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError(this.sharedService.handleError)
      );
  }

  updateCiebProvince(
    ciebProvince: CiebProvince,
    stateCode: string
  ): Observable<any> {
    let body = JSON.stringify(ciebProvince);
    return this.httpClient
      .put(`${this.ciebProvinceUrl}/${stateCode}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError(this.sharedService.handleError)
      );
  }

  partiallyUpdateCiebProvince(
    ciebProvince: CiebProvince,
    stateCode: string
  ): Observable<any> {
    let body = JSON.stringify(ciebProvince);
    return this.httpClient
      .patch(`${this.ciebProvinceUrl}/${stateCode}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError(this.sharedService.handleError)
      );
  }

  deleteCiebProvince(stateCode: string): Observable<any> {
    return this.httpClient
      .delete(`${this.ciebProvinceUrl}/${stateCode}`, { observe: "response" })
      .pipe(
        map((response) => response.body),
        catchError(this.sharedService.handleError)
      );
  }
}