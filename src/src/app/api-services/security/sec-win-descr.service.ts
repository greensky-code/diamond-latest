/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecWinDescr} from "../../api-models";

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
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecWinDescr[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecWinDescr(winId: string): Observable<SecWinDescr> {
        return this.httpClient.get(`${this.secWinDescrUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecWinDescr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecWinDescrsCount(): Observable<number> {
        var url = `${this.secWinDescrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createSecWinDescr(secWinDescr: SecWinDescr): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.post(this.secWinDescrUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecWinDescr(secWinDescr: SecWinDescr, winId: string): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.put(`${this.secWinDescrUrl}/${winId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecWinDescr(secWinDescr: SecWinDescr, winId: string): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.patch(`${this.secWinDescrUrl}/${winId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecWinDescr(winId: string): Observable<any> {
        return this.httpClient.delete(`${this.secWinDescrUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
