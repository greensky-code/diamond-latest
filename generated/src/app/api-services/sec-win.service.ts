/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecWin } from '../api-models/sec-win.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecWinService {

    private secWinUrl: string = `${environment.apiUrl}/secwins`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecWins(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecWin[]> {
        var url = `${this.secWinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecWin[]),
                catchError(this.sharedService.handleError))
    }

    getSecWin(userId : string): Observable<SecWin> {
        return this.httpClient.get(`${this.secWinUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecWin),
                catchError(this.sharedService.handleError))
    }

    getSecWinsCount(): Observable<number> {
        var url = `${this.secWinUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByUserId(userId : string): Observable<SecWin[]> {
        return this.httpClient.get(`${this.secWinUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecWin),
                catchError(this.sharedService.handleError))
    }
    findByUserId(userId : string): Observable<SecWin[]> {
        return this.httpClient.get(`${this.secWinUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecWin),
                catchError(this.sharedService.handleError))
    }




    createSecWin(secWin : SecWin): Observable<any> {
        let body = JSON.stringify(secWin);
        return this.httpClient.post(this.secWinUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecWin(secWin : SecWin, userId : string): Observable<any> {
        let body = JSON.stringify(secWin);
        return this.httpClient.put(`${this.secWinUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecWin(secWin : SecWin, userId : string): Observable<any> {
        let body = JSON.stringify(secWin);
        return this.httpClient.patch(`${this.secWinUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecWin(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secWinUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}