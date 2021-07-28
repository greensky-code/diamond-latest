/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SecWinDescr } from '../api-models/sec-win-descr.model'
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class SecWinDescrService {

    private secWinDescrUrl: string = `${environment.apiUrl}/secwindescrs`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecWinDescrs(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<SecWinDescr[]> {
        var url = `${this.secWinDescrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url,
            {
                observe: 'response'
            }).pipe(map(response => response.body as SecWinDescr[]),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }
    getSecWinDescrsWith_NotesCNameNotNull(): Observable<SecWinDescr[]> {
        const url = `${this.secWinDescrUrl}/get-SecWinDescrs-With_NotesCNameNotNull`;
        return this.httpClient.get(url,
            {
                observe: 'response'
            }).pipe(map(response => response.body as SecWinDescr[]),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    getSecWinDescr(languageId: number): Observable<SecWinDescr> {
        return this.httpClient.get(`${this.secWinDescrUrl}/${languageId}`,
            {
                observe: 'response'
            }).pipe(map(response => response.body as SecWinDescr),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    getSecWinDescrsCount(): Observable<number> {
        var url = `${this.secWinDescrUrl}/count`;
        return this.httpClient.get(url, {
            observe: 'response'
        }).pipe(map(response => response.body as number),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
        );
    }


    createSecWinDescr(secWinDescr: SecWinDescr): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.post(this.secWinDescrUrl, body,
            {
                headers: this.contentHeaders
            }).pipe(map(response => response),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecWinDescr(secWinDescr: SecWinDescr, languageId: number): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.put(`${this.secWinDescrUrl}/${languageId}`, body,
            { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecWinDescr(secWinDescr: SecWinDescr, languageId: number): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.patch(`${this.secWinDescrUrl}/${languageId}`, body,
            {
                headers: this.contentHeaders
            }).pipe(map(response => response),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecWinDescr(languageId: number): Observable<any> {
        return this.httpClient.delete(`${this.secWinDescrUrl}/${languageId}`,
            {
                observe: 'response'
            }).pipe(map(response => response.body),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupsShortKeys() {
        return this.httpClient.get(`${this.secWinDescrUrl}/getSecDesrShortkeys`).pipe(map(resp => resp),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
