/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuditKeywordTable } from '../api-models/audit-keyword-table.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuditKeywordTableService {

    private auditKeywordTableUrl: string = `${environment.apiUrl}/auditkeywordtables`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuditKeywordTables(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuditKeywordTable[]> {
        var url = `${this.auditKeywordTableUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuditKeywordTable[]),
                catchError(this.sharedService.handleError))
    }

    getAuditKeywordTable(keyword : string): Observable<AuditKeywordTable> {
        return this.httpClient.get(`${this.auditKeywordTableUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as AuditKeywordTable),
                catchError(this.sharedService.handleError))
    }

    getAuditKeywordTablesCount(): Observable<number> {
        var url = `${this.auditKeywordTableUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuditKeywordTable(auditKeywordTable : AuditKeywordTable): Observable<any> {
        let body = JSON.stringify(auditKeywordTable);
        return this.httpClient.post(this.auditKeywordTableUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuditKeywordTable(auditKeywordTable : AuditKeywordTable, keyword : string): Observable<any> {
        let body = JSON.stringify(auditKeywordTable);
        return this.httpClient.put(`${this.auditKeywordTableUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuditKeywordTable(auditKeywordTable : AuditKeywordTable, keyword : string): Observable<any> {
        let body = JSON.stringify(auditKeywordTable);
        return this.httpClient.patch(`${this.auditKeywordTableUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuditKeywordTable(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.auditKeywordTableUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}