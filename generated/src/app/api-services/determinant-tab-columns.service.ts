/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantTabColumns } from '../api-models/determinant-tab-columns.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DeterminantTabColumnsService {

    private determinantTabColumnsUrl: string = `${environment.apiUrl}/determinanttabcolumnss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantTabColumnss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantTabColumns[]> {
        var url = `${this.determinantTabColumnsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTabColumns[]),
                catchError(this.sharedService.handleError))
    }

    getDeterminantTabColumns(keyword : string): Observable<DeterminantTabColumns> {
        return this.httpClient.get(`${this.determinantTabColumnsUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTabColumns),
                catchError(this.sharedService.handleError))
    }

    getDeterminantTabColumnssCount(): Observable<number> {
        var url = `${this.determinantTabColumnsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDeterminantTabColumns(determinantTabColumns : DeterminantTabColumns): Observable<any> {
        let body = JSON.stringify(determinantTabColumns);
        return this.httpClient.post(this.determinantTabColumnsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDeterminantTabColumns(determinantTabColumns : DeterminantTabColumns, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantTabColumns);
        return this.httpClient.put(`${this.determinantTabColumnsUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDeterminantTabColumns(determinantTabColumns : DeterminantTabColumns, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantTabColumns);
        return this.httpClient.patch(`${this.determinantTabColumnsUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDeterminantTabColumns(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantTabColumnsUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}