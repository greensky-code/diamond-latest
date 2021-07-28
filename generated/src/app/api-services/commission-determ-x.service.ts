/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommissionDetermX } from '../api-models/commission-determ-x.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CommissionDetermXService {

    private commissionDetermXUrl: string = `${environment.apiUrl}/commissiondetermxes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCommissionDetermXes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CommissionDetermX[]> {
        var url = `${this.commissionDetermXUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetermX[]),
                catchError(this.sharedService.handleError))
    }

    getCommissionDetermX(matrixDeterminant : string): Observable<CommissionDetermX> {
        return this.httpClient.get(`${this.commissionDetermXUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetermX),
                catchError(this.sharedService.handleError))
    }

    getCommissionDetermXesCount(): Observable<number> {
        var url = `${this.commissionDetermXUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMatrixDeterminant(matrixDeterminant : string): Observable<CommissionDetermX[]> {
        return this.httpClient.get(`${this.commissionDetermXUrl}/find-by-matrixdeterminant/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetermX),
                catchError(this.sharedService.handleError))
    }




    createCommissionDetermX(commissionDetermX : CommissionDetermX): Observable<any> {
        let body = JSON.stringify(commissionDetermX);
        return this.httpClient.post(this.commissionDetermXUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCommissionDetermX(commissionDetermX : CommissionDetermX, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(commissionDetermX);
        return this.httpClient.put(`${this.commissionDetermXUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCommissionDetermX(commissionDetermX : CommissionDetermX, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(commissionDetermX);
        return this.httpClient.patch(`${this.commissionDetermXUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCommissionDetermX(matrixDeterminant : string): Observable<any> {
        return this.httpClient.delete(`${this.commissionDetermXUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}