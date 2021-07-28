/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NavWin } from '../api-models/nav-win.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NavWinService {

    private navWinUrl: string = `${environment.apiUrl}/navwins`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNavWins(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NavWin[]> {
        var url = `${this.navWinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NavWin[]),
                catchError(this.sharedService.handleError))
    }

    getNavWin(winId : string): Observable<NavWin> {
        return this.httpClient.get(`${this.navWinUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as NavWin),
                catchError(this.sharedService.handleError))
    }

    getNavWinsCount(): Observable<number> {
        var url = `${this.navWinUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createNavWin(navWin : NavWin): Observable<any> {
        let body = JSON.stringify(navWin);
        return this.httpClient.post(this.navWinUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateNavWin(navWin : NavWin, winId : string): Observable<any> {
        let body = JSON.stringify(navWin);
        return this.httpClient.put(`${this.navWinUrl}/${winId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateNavWin(navWin : NavWin, winId : string): Observable<any> {
        let body = JSON.stringify(navWin);
        return this.httpClient.patch(`${this.navWinUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteNavWin(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.navWinUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}