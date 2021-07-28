/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermY } from '../api-models/matrix-determ-y.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MatrixDetermYService {

    private matrixDetermYUrl: string = `${environment.apiUrl}/matrixdetermys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMatrixDetermYs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MatrixDetermY[]> {
        var url = `${this.matrixDetermYUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermY[]),
                catchError(this.sharedService.handleError))
    }

    getMatrixDetermY(matrixDeterminant : string): Observable<MatrixDetermY> {
        return this.httpClient.get(`${this.matrixDetermYUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermY),
                catchError(this.sharedService.handleError))
    }

    getMatrixDetermYsCount(): Observable<number> {
        var url = `${this.matrixDetermYUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMatrixDeterminant(matrixDeterminant : string): Observable<MatrixDetermY[]> {
        return this.httpClient.get(`${this.matrixDetermYUrl}/find-by-matrixdeterminant/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermY),
                catchError(this.sharedService.handleError))
    }




    createMatrixDetermY(matrixDetermY : MatrixDetermY): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.post(this.matrixDetermYUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMatrixDetermY(matrixDetermY : MatrixDetermY, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.put(`${this.matrixDetermYUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMatrixDetermY(matrixDetermY : MatrixDetermY, matrixDeterminant : string): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.patch(`${this.matrixDetermYUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMatrixDetermY(matrixDeterminant : string): Observable<any> {
        return this.httpClient.delete(`${this.matrixDetermYUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}