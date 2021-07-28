/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuclsModelDeterminant } from '../api-models/aucls-model-determinant.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuclsModelDeterminantService {

    private auclsModelDeterminantUrl: string = `${environment.apiUrl}/auclsmodeldeterminants`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuclsModelDeterminants(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuclsModelDeterminant[]> {
        var url = `${this.auclsModelDeterminantUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModelDeterminant[]),
                catchError(this.sharedService.handleError))
    }

    getAuclsModelDeterminant(auclsModelId : string): Observable<AuclsModelDeterminant> {
        return this.httpClient.get(`${this.auclsModelDeterminantUrl}/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModelDeterminant),
                catchError(this.sharedService.handleError))
    }

    getAuclsModelDeterminantsCount(): Observable<number> {
        var url = `${this.auclsModelDeterminantUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByAuclsModelId(auclsModelId : string): Observable<AuclsModelDeterminant[]> {
        return this.httpClient.get(`${this.auclsModelDeterminantUrl}/find-by-auclsmodelid/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModelDeterminant),
                catchError(this.sharedService.handleError))
    }




    createAuclsModelDeterminant(auclsModelDeterminant : AuclsModelDeterminant): Observable<any> {
        let body = JSON.stringify(auclsModelDeterminant);
        return this.httpClient.post(this.auclsModelDeterminantUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuclsModelDeterminant(auclsModelDeterminant : AuclsModelDeterminant, auclsModelId : string): Observable<any> {
        let body = JSON.stringify(auclsModelDeterminant);
        return this.httpClient.put(`${this.auclsModelDeterminantUrl}/${auclsModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuclsModelDeterminant(auclsModelDeterminant : AuclsModelDeterminant, auclsModelId : string): Observable<any> {
        let body = JSON.stringify(auclsModelDeterminant);
        return this.httpClient.patch(`${this.auclsModelDeterminantUrl}/${auclsModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuclsModelDeterminant(auclsModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.auclsModelDeterminantUrl}/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}