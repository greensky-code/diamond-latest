/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageEraCompany } from '../api-models/stage-era-company.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageEraCompanyService {

    private stageEraCompanyUrl: string = `${environment.apiUrl}/stageeracompanys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageEraCompanys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageEraCompany[]> {
        var url = `${this.stageEraCompanyUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageEraCompany[]),
                catchError(this.sharedService.handleError))
    }

    getStageEraCompany(batchId : string): Observable<StageEraCompany> {
        return this.httpClient.get(`${this.stageEraCompanyUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraCompany),
                catchError(this.sharedService.handleError))
    }

    getStageEraCompanysCount(): Observable<number> {
        var url = `${this.stageEraCompanyUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StageEraCompany[]> {
        return this.httpClient.get(`${this.stageEraCompanyUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraCompany),
                catchError(this.sharedService.handleError))
    }




    createStageEraCompany(stageEraCompany : StageEraCompany): Observable<any> {
        let body = JSON.stringify(stageEraCompany);
        return this.httpClient.post(this.stageEraCompanyUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageEraCompany(stageEraCompany : StageEraCompany, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraCompany);
        return this.httpClient.put(`${this.stageEraCompanyUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageEraCompany(stageEraCompany : StageEraCompany, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraCompany);
        return this.httpClient.patch(`${this.stageEraCompanyUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageEraCompany(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageEraCompanyUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}