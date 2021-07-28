/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DbColsNotCaseSensitive } from '../api-models/db-cols-not-case-sensitive.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DbColsNotCaseSensitiveService {

    private dbColsNotCaseSensitiveUrl: string = `${environment.apiUrl}/dbcolsnotcasesensitives`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDbColsNotCaseSensitives(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DbColsNotCaseSensitive[]> {
        var url = `${this.dbColsNotCaseSensitiveUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DbColsNotCaseSensitive[]),
                catchError(this.sharedService.handleError))
    }

    getDbColsNotCaseSensitive(caseInsensitiveTblNmPk : string): Observable<DbColsNotCaseSensitive> {
        return this.httpClient.get(`${this.dbColsNotCaseSensitiveUrl}/${caseInsensitiveTblNmPk}`, {observe: 'response'})
            .pipe(map(response => response.body as DbColsNotCaseSensitive),
                catchError(this.sharedService.handleError))
    }

    getDbColsNotCaseSensitivesCount(): Observable<number> {
        var url = `${this.dbColsNotCaseSensitiveUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDbColsNotCaseSensitive(dbColsNotCaseSensitive : DbColsNotCaseSensitive): Observable<any> {
        let body = JSON.stringify(dbColsNotCaseSensitive);
        return this.httpClient.post(this.dbColsNotCaseSensitiveUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDbColsNotCaseSensitive(dbColsNotCaseSensitive : DbColsNotCaseSensitive, caseInsensitiveTblNmPk : string): Observable<any> {
        let body = JSON.stringify(dbColsNotCaseSensitive);
        return this.httpClient.put(`${this.dbColsNotCaseSensitiveUrl}/${caseInsensitiveTblNmPk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDbColsNotCaseSensitive(dbColsNotCaseSensitive : DbColsNotCaseSensitive, caseInsensitiveTblNmPk : string): Observable<any> {
        let body = JSON.stringify(dbColsNotCaseSensitive);
        return this.httpClient.patch(`${this.dbColsNotCaseSensitiveUrl}/${caseInsensitiveTblNmPk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDbColsNotCaseSensitive(caseInsensitiveTblNmPk : string): Observable<any> {
        return this.httpClient.delete(`${this.dbColsNotCaseSensitiveUrl}/${caseInsensitiveTblNmPk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}