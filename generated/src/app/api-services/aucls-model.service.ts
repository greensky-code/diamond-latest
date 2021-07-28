/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuclsModel } from '../api-models/aucls-model.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuclsModelService {

    private auclsModelUrl: string = `${environment.apiUrl}/auclsmodels`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuclsModels(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuclsModel[]> {
        var url = `${this.auclsModelUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModel[]),
                catchError(this.sharedService.handleError))
    }

    getAuclsModel(auclsModelId : string): Observable<AuclsModel> {
        return this.httpClient.get(`${this.auclsModelUrl}/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsModel),
                catchError(this.sharedService.handleError))
    }

    getAuclsModelsCount(): Observable<number> {
        var url = `${this.auclsModelUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuclsModel(auclsModel : AuclsModel): Observable<any> {
        let body = JSON.stringify(auclsModel);
        return this.httpClient.post(this.auclsModelUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuclsModel(auclsModel : AuclsModel, auclsModelId : string): Observable<any> {
        let body = JSON.stringify(auclsModel);
        return this.httpClient.put(`${this.auclsModelUrl}/${auclsModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuclsModel(auclsModel : AuclsModel, auclsModelId : string): Observable<any> {
        let body = JSON.stringify(auclsModel);
        return this.httpClient.patch(`${this.auclsModelUrl}/${auclsModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuclsModel(auclsModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.auclsModelUrl}/${auclsModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}