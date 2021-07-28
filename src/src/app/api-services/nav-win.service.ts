/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavWin } from '../api-models/nav-win.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class NavWinService {

    private navWinUrl: string = `${environment.apiUrl}/navwins`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNavWins(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<NavWin[]> {
        var url = `${this.navWinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as NavWin[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNavWin(winId: string): Observable<NavWin> {
        return this.httpClient.get(`${this.navWinUrl}/${winId}`, { observe: 'response' })
            .pipe(map(response => response.body as NavWin),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNavWinsCount(): Observable<number> {
        var url = `${this.navWinUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createNavWin(navWin: NavWin): Observable<any> {
        let body = JSON.stringify(navWin);
        return this.httpClient.post(this.navWinUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateNavWin(navWin: NavWin, winId: string): Observable<any> {
        let body = JSON.stringify(navWin);
        return this.httpClient.put(`${this.navWinUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateNavWin(navWin: NavWin, winId: string): Observable<any> {
        let body = JSON.stringify(navWin);
        return this.httpClient.patch(`${this.navWinUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteNavWin(winId: string): Observable<any> {
        return this.httpClient.delete(`${this.navWinUrl}/${winId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
