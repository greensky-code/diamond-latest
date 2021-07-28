/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CompileSchemaTmp } from '../api-models/compile-schema-tmp.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CompileSchemaTmpService {

    private compileSchemaTmpUrl: string = `${environment.apiUrl}/compileschematmps`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCompileSchemaTmps(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CompileSchemaTmp[]> {
        var url = `${this.compileSchemaTmpUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CompileSchemaTmp[]),
                catchError(this.sharedService.handleError))
    }

    getCompileSchemaTmp(objectName : string): Observable<CompileSchemaTmp> {
        return this.httpClient.get(`${this.compileSchemaTmpUrl}/${objectName}`, {observe: 'response'})
            .pipe(map(response => response.body as CompileSchemaTmp),
                catchError(this.sharedService.handleError))
    }

    getCompileSchemaTmpsCount(): Observable<number> {
        var url = `${this.compileSchemaTmpUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCompileSchemaTmp(compileSchemaTmp : CompileSchemaTmp): Observable<any> {
        let body = JSON.stringify(compileSchemaTmp);
        return this.httpClient.post(this.compileSchemaTmpUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCompileSchemaTmp(compileSchemaTmp : CompileSchemaTmp, objectName : string): Observable<any> {
        let body = JSON.stringify(compileSchemaTmp);
        return this.httpClient.put(`${this.compileSchemaTmpUrl}/${objectName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCompileSchemaTmp(compileSchemaTmp : CompileSchemaTmp, objectName : string): Observable<any> {
        let body = JSON.stringify(compileSchemaTmp);
        return this.httpClient.patch(`${this.compileSchemaTmpUrl}/${objectName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCompileSchemaTmp(objectName : string): Observable<any> {
        return this.httpClient.delete(`${this.compileSchemaTmpUrl}/${objectName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}