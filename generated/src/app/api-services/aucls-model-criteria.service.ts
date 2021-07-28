/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuclsModelCriteria } from '../api-models/aucls-model-criteria.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuclsModelCriteriaService {

    private auclsModelCriteriaUrl: string = `${environment.apiUrl}/auclsmodelcriterias`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuclsModelCriterias(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuclsModelCriteria[]> {
        var url = `${this.auclsModelCriteriaUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModelCriteria[]),
                catchError(this.sharedService.handleError))
    }

    getAuclsModelCriteria(auclsModelId : string): Observable<AuclsModelCriteria> {
        return this.httpClient.get(`${this.auclsModelCriteriaUrl}/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModelCriteria),
                catchError(this.sharedService.handleError))
    }

    getAuclsModelCriteriasCount(): Observable<number> {
        var url = `${this.auclsModelCriteriaUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByAuclsModelId(auclsModelId : string): Observable<AuclsModelCriteria[]> {
        return this.httpClient.get(`${this.auclsModelCriteriaUrl}/find-by-auclsmodelid/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModelCriteria),
                catchError(this.sharedService.handleError))
    }




    createAuclsModelCriteria(auclsModelCriteria : AuclsModelCriteria): Observable<any> {
        let body = JSON.stringify(auclsModelCriteria);
        return this.httpClient.post(this.auclsModelCriteriaUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuclsModelCriteria(auclsModelCriteria : AuclsModelCriteria, auclsModelId : string): Observable<any> {
        let body = JSON.stringify(auclsModelCriteria);
        return this.httpClient.put(`${this.auclsModelCriteriaUrl}/${auclsModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuclsModelCriteria(auclsModelCriteria : AuclsModelCriteria, auclsModelId : string): Observable<any> {
        let body = JSON.stringify(auclsModelCriteria);
        return this.httpClient.patch(`${this.auclsModelCriteriaUrl}/${auclsModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuclsModelCriteria(auclsModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.auclsModelCriteriaUrl}/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}