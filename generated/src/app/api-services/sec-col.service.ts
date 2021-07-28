/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecCol } from '../api-models/sec-col.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecColService {

    private secColUrl: string = `${environment.apiUrl}/seccols`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecCols(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecCol[]> {
        var url = `${this.secColUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecCol[]),
                catchError(this.sharedService.handleError))
    }

    getSecCol(userId : string): Observable<SecCol> {
        return this.httpClient.get(`${this.secColUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecCol),
                catchError(this.sharedService.handleError))
    }

    getSecColsCount(): Observable<number> {
        var url = `${this.secColUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByUserId(userId : string): Observable<SecCol[]> {
        return this.httpClient.get(`${this.secColUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecCol),
                catchError(this.sharedService.handleError))
    }




    createSecCol(secCol : SecCol): Observable<any> {
        let body = JSON.stringify(secCol);
        return this.httpClient.post(this.secColUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecCol(secCol : SecCol, userId : string): Observable<any> {
        let body = JSON.stringify(secCol);
        return this.httpClient.put(`${this.secColUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecCol(secCol : SecCol, userId : string): Observable<any> {
        let body = JSON.stringify(secCol);
        return this.httpClient.patch(`${this.secColUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecCol(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secColUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}