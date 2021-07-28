/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment'
import {SharedService} from '../../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';
import {SecWin} from "../../api-models/security/sec-win.model";

@Injectable({
  providedIn: "root",
})
export class SecWinService {
  private secWinUrl: string = `${environment.apiUrl}/secwins`;
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

  getSecWins(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<SecWin[]> {
    var url = `${this.secWinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as SecWin[]),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }


  findBySecWinUserId(userId: string): Observable<SecWin[]> {
    const url = `${this.secWinUrl}/find-by-userid/${userId}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as SecWin),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }
    getSecWin(userId : string, winId: string): Observable<SecWin> {
        return this.httpClient.get(`${this.secWinUrl}/${userId}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecWin),
                catchError(
                     this.sharedService.handleError
                 )
            )
    }

  getSecWinsCount(): Observable<number> {
    var url = `${this.secWinUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }

  createSecWin(secWin: SecWin): Observable<any> {
    let body = JSON.stringify(secWin);
    return this.httpClient
      .post(this.secWinUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  updateSecWin(secWin: SecWin, winId: string, userId: string): Observable<any> {
    let body = JSON.stringify(secWin);
    return this.httpClient
      .post(`${this.secWinUrl}/${winId}/${userId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  partiallyUpdateSecWin(secWin: SecWin, userId: string): Observable<any> {
    let body = JSON.stringify(secWin);
    return this.httpClient
      .patch(`${this.secWinUrl}/${userId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  deleteSecWin(userId: string): Observable<any> {
    return this.httpClient
      .delete(`${this.secWinUrl}/${userId}`, { observe: "response" })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }
  updateUserSec(
    secWin: SecWin[],
  ): Observable<any> {
    let body = JSON.stringify(secWin);
    return this.httpClient
      .post(`${this.secWinUrl}/updateUserSec`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }
}
