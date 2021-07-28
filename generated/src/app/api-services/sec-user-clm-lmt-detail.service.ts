/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecUserClmLmtDetail } from '../api-models/sec-user-clm-lmt-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecUserClmLmtDetailService {

    private secUserClmLmtDetailUrl: string = `${environment.apiUrl}/secuserclmlmtdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecUserClmLmtDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecUserClmLmtDetail[]> {
        var url = `${this.secUserClmLmtDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecUserClmLmtDetail[]),
                catchError(this.sharedService.handleError))
    }

    getSecUserClmLmtDetail(userId : string): Observable<SecUserClmLmtDetail> {
        return this.httpClient.get(`${this.secUserClmLmtDetailUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUserClmLmtDetail),
                catchError(this.sharedService.handleError))
    }

    getSecUserClmLmtDetailsCount(): Observable<number> {
        var url = `${this.secUserClmLmtDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByUserId(userId : string): Observable<SecUserClmLmtDetail[]> {
        return this.httpClient.get(`${this.secUserClmLmtDetailUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUserClmLmtDetail),
                catchError(this.sharedService.handleError))
    }




    createSecUserClmLmtDetail(secUserClmLmtDetail : SecUserClmLmtDetail): Observable<any> {
        let body = JSON.stringify(secUserClmLmtDetail);
        return this.httpClient.post(this.secUserClmLmtDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecUserClmLmtDetail(secUserClmLmtDetail : SecUserClmLmtDetail, userId : string): Observable<any> {
        let body = JSON.stringify(secUserClmLmtDetail);
        return this.httpClient.put(`${this.secUserClmLmtDetailUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecUserClmLmtDetail(secUserClmLmtDetail : SecUserClmLmtDetail, userId : string): Observable<any> {
        let body = JSON.stringify(secUserClmLmtDetail);
        return this.httpClient.patch(`${this.secUserClmLmtDetailUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecUserClmLmtDetail(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secUserClmLmtDetailUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}