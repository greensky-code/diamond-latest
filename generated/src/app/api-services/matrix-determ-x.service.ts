/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermX } from '../api-models/matrix-determ-x.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MatrixDetermXService {

    private matrixDetermXUrl: string = `${environment.apiUrl}/matrixdetermxes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMatrixDetermXes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MatrixDetermX[]> {
        var url = `${this.matrixDetermXUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermX[]),
                catchError(this.sharedService.handleError))
    }

    getMatrixDetermX(matrixDeterminant : string): Observable<MatrixDetermX> {
        return this.httpClient.get(`${this.matrixDetermXUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermX),
                catchError(this.sharedService.handleError))
    }

    getMatrixDetermXesCount(): Observable<number> {
        var url = `${this.matrixDetermXUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMatrixDeterminant(matrixDeterminant : string): Observable<MatrixDetermX[]> {
        return this.httpClient.get(`${this.matrixDetermXUrl}/find-by-matrixdeterminant/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermX),
                catchError(this.sharedService.handleError))
    }




    createMatrixDetermX(matrixDetermX : MatrixDetermX): Observable<any> {
        let body = JSON.stringify(matrixDetermX);
        return this.httpClient.post(this.matrixDetermXUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMatrixDetermX(matrixDetermX : MatrixDetermX, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(matrixDetermX);
        return this.httpClient.put(`${this.matrixDetermXUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMatrixDetermX(matrixDetermX : MatrixDetermX, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(matrixDetermX);
        return this.httpClient.patch(`${this.matrixDetermXUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMatrixDetermX(matrixDeterminant : string): Observable<any> {
        return this.httpClient.delete(`${this.matrixDetermXUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}