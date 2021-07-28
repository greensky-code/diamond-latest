/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AllTabColumns } from '../api-models/all-tab-columns.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AllTabColumnsService {

    private allTabColumnsUrl: string = `${environment.apiUrl}/alltabcolumnss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAllTabColumnss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AllTabColumns[]> {
        var url = `${this.allTabColumnsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AllTabColumns[]),
                catchError(this.sharedService.handleError))
    }

    getAllTabColumns(owners : string): Observable<AllTabColumns> {
        return this.httpClient.get(`${this.allTabColumnsUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body as AllTabColumns),
                catchError(this.sharedService.handleError))
    }

    getAllTabColumnssCount(): Observable<number> {
        var url = `${this.allTabColumnsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAllTabColumns(allTabColumns : AllTabColumns): Observable<any> {
        let body = JSON.stringify(allTabColumns);
        return this.httpClient.post(this.allTabColumnsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAllTabColumns(allTabColumns : AllTabColumns, owners : string): Observable<any> {
        let body = JSON.stringify(allTabColumns);
        return this.httpClient.put(`${this.allTabColumnsUrl}/${owners}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAllTabColumns(allTabColumns : AllTabColumns, owners : string): Observable<any> {
        let body = JSON.stringify(allTabColumns);
        return this.httpClient.patch(`${this.allTabColumnsUrl}/${owners}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAllTabColumns(owners : string): Observable<any> {
        return this.httpClient.delete(`${this.allTabColumnsUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}