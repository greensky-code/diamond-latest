/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AllTable } from '../api-models/all-table.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AllTableService {

    private allTableUrl: string = `${environment.apiUrl}/alltables`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAllTables(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AllTable[]> {
        var url = `${this.allTableUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AllTable[]),
                catchError(this.sharedService.handleError))
    }

    getAllTable(owners : string): Observable<AllTable> {
        return this.httpClient.get(`${this.allTableUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body as AllTable),
                catchError(this.sharedService.handleError))
    }

    getAllTablesCount(): Observable<number> {
        var url = `${this.allTableUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAllTable(allTable : AllTable): Observable<any> {
        let body = JSON.stringify(allTable);
        return this.httpClient.post(this.allTableUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAllTable(allTable : AllTable, owners : string): Observable<any> {
        let body = JSON.stringify(allTable);
        return this.httpClient.put(`${this.allTableUrl}/${owners}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAllTable(allTable : AllTable, owners : string): Observable<any> {
        let body = JSON.stringify(allTable);
        return this.httpClient.patch(`${this.allTableUrl}/${owners}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAllTable(owners : string): Observable<any> {
        return this.httpClient.delete(`${this.allTableUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}