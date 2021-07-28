/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermY } from '../../api-models/premium/matrix-determ-y.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import {MatrixDetermX} from "../../api-models/premium/matrix-determ-x.model";

@Injectable({
    providedIn: "root"
})
export class MatrixDetermYService {

    private matrixDetermYUrl = `${environment.apiUrl}/matrixdetermys/find-by-matrixdeterminant`;
    private matrixDetermYUrlGet = `${environment.apiUrl}/matrixdetermys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMatrixDetermYs(usePagination= false, page = 0, size = 0): Observable<MatrixDetermY[]> {
        let url = `${this.matrixDetermYUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermY[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMatrixDetermY(matrixDeterminant: string): Observable<MatrixDetermY> {
        return this.httpClient.get(`${this.matrixDetermYUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermY),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMatrixDetermYsCount(): Observable<number> {
        let url = `${this.matrixDetermYUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByMatrixDeterminant(matrixDeterminant: string): Observable<MatrixDetermY[]> {
        return this.httpClient.get(`${this.matrixDetermYUrl}/find-by-matrixdeterminant/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as MatrixDetermY),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPremiumMatrixHeaderMatrixDetermAndMatrixdef(matrixDeterm: string, matrixdef: string ): Observable<any[]> {
        return this.httpClient.get(`${this.matrixDetermYUrlGet}/find-by-matrixdeterm-matrixdef/${matrixDeterm}/${matrixdef}`, {observe: 'response'})
            .pipe(map(response => response.body as any[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    createMatrixDetermY(matrixDetermY: MatrixDetermY): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.post(this.matrixDetermYUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMatrixDetermY(matrixDetermY: MatrixDetermY, matrixDeterminant: string): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.put(`${this.matrixDetermYUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMatrixDetermY(matrixDetermY: MatrixDetermY, matrixDeterminant: string): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.patch(`${this.matrixDetermYUrl}/${matrixDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMatrixDetermY(matrixDeterminant: string): Observable<any> {
        return this.httpClient.delete(`${this.matrixDetermYUrl}/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    addUpdateMatrixDetermY(matrixDetermY : MatrixDetermY[]): Observable<any> {
        let body = JSON.stringify(matrixDetermY);
        return this.httpClient.post(`${this.matrixDetermYUrlGet}/addUpdateMatrixDetermY`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
