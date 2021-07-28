/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermHeader } from '../api-models/matrix-determ-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MatrixDetermHeaderService {

    private matrixDetermHeaderUrl: string = `${environment.apiUrl}/matrixdetermheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMatrixDetermHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MatrixDetermHeader[]> {
        var url = `${this.matrixDetermHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermHeader[]),
                catchError(this.sharedService.handleError))
    }

    getMatrixDetermHeader(matrixDeterminant : string): Observable<MatrixDetermHeader> {
        return this.httpClient.get(`${this.matrixDetermHeaderUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermHeader),
                catchError(this.sharedService.handleError))
    }

    getMatrixDetermHeadersCount(): Observable<number> {
        var url = `${this.matrixDetermHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMatrixDetermHeader(matrixDetermHeader : MatrixDetermHeader): Observable<any> {
        let body = JSON.stringify(matrixDetermHeader);
        return this.httpClient.post(this.matrixDetermHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMatrixDetermHeader(matrixDetermHeader : MatrixDetermHeader, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(matrixDetermHeader);
        return this.httpClient.put(`${this.matrixDetermHeaderUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMatrixDetermHeader(matrixDetermHeader : MatrixDetermHeader, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(matrixDetermHeader);
        return this.httpClient.patch(`${this.matrixDetermHeaderUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMatrixDetermHeader(matrixDeterminant : string): Observable<any> {
        return this.httpClient.delete(`${this.matrixDetermHeaderUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}