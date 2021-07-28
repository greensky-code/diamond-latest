/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCashBatchControl } from '../api-models/ar-cash-batch-control.model'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArCashBatchControlService {

  private arCashBatchControlUrl: string = `${environment.apiUrl}/arcashbatchcontrols`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getArCashBatchControls(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ArCashBatchControl[]> {
    var url = `${this.arCashBatchControlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as ArCashBatchControl[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  getArCashBatchControl(seqCashBatchId: number): Observable<ArCashBatchControl> {
    return this.httpClient.get(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, { observe: 'response' })
      .pipe(map(response => response.body as ArCashBatchControl),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  getArCashBatchControlsCount(): Observable<number> {
    var url = `${this.arCashBatchControlUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  createArCashBatchControl(arCashBatchControl: ArCashBatchControl): Observable<any> {
    let body = JSON.stringify(arCashBatchControl);
    return this.httpClient.post(this.arCashBatchControlUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  updateArCashBatchControl(arCashBatchControl: ArCashBatchControl, seqCashBatchId: number): Observable<any> {
    let body = JSON.stringify(arCashBatchControl);
    return this.httpClient.put(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  partiallyUpdateArCashBatchControl(arCashBatchControl: ArCashBatchControl, seqCashBatchId: number): Observable<any> {
    let body = JSON.stringify(arCashBatchControl);
    return this.httpClient.patch(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  deleteArCashBatchControl(seqCashBatchId: number): Observable<any> {
    return this.httpClient.delete(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  getNewBatchId(): Observable<number> {
    var url = `${this.arCashBatchControlUrl}/new-batch-id`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  cashPost(seqCashBatchId: number): Observable<void> {
    return this.httpClient.get(`${this.arCashBatchControlUrl}/cash-post/${seqCashBatchId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

}
