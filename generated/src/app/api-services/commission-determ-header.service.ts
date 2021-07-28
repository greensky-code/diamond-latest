/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommissionDetermHeader } from '../api-models/commission-determ-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CommissionDetermHeaderService {

    private commissionDetermHeaderUrl: string = `${environment.apiUrl}/commissiondetermheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCommissionDetermHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CommissionDetermHeader[]> {
        var url = `${this.commissionDetermHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetermHeader[]),
                catchError(this.sharedService.handleError))
    }

    getCommissionDetermHeader(matrixDeterminant : string): Observable<CommissionDetermHeader> {
        return this.httpClient.get(`${this.commissionDetermHeaderUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetermHeader),
                catchError(this.sharedService.handleError))
    }

    getCommissionDetermHeadersCount(): Observable<number> {
        var url = `${this.commissionDetermHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCommissionDetermHeader(commissionDetermHeader : CommissionDetermHeader): Observable<any> {
        let body = JSON.stringify(commissionDetermHeader);
        return this.httpClient.post(this.commissionDetermHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCommissionDetermHeader(commissionDetermHeader : CommissionDetermHeader, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(commissionDetermHeader);
        return this.httpClient.put(`${this.commissionDetermHeaderUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCommissionDetermHeader(commissionDetermHeader : CommissionDetermHeader, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(commissionDetermHeader);
        return this.httpClient.patch(`${this.commissionDetermHeaderUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCommissionDetermHeader(matrixDeterminant : string): Observable<any> {
        return this.httpClient.delete(`${this.commissionDetermHeaderUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}