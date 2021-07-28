/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantTables } from '../api-models/determinant-tables.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DeterminantTablesService {

    private determinantTablesUrl: string = `${environment.apiUrl}/determinanttableses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantTableses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantTables[]> {
        var url = `${this.determinantTablesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTables[]),
                catchError(this.sharedService.handleError))
    }

    getDeterminantTables(keyword : string): Observable<DeterminantTables> {
        return this.httpClient.get(`${this.determinantTablesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTables),
                catchError(this.sharedService.handleError))
    }

    getDeterminantTablesesCount(): Observable<number> {
        var url = `${this.determinantTablesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDeterminantTables(determinantTables : DeterminantTables): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.post(this.determinantTablesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDeterminantTables(determinantTables : DeterminantTables, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.put(`${this.determinantTablesUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDeterminantTables(determinantTables : DeterminantTables, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.patch(`${this.determinantTablesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDeterminantTables(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantTablesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}