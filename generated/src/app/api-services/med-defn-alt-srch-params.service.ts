/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnAltSrchParams } from '../api-models/med-defn-alt-srch-params.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MedDefnAltSrchParamsService {

    private medDefnAltSrchParamsUrl: string = `${environment.apiUrl}/meddefnaltsrchparamss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnAltSrchParamss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MedDefnAltSrchParams[]> {
        var url = `${this.medDefnAltSrchParamsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnAltSrchParams[]),
                catchError(this.sharedService.handleError))
    }

    getMedDefnAltSrchParams(criteriaSrchPriority : number): Observable<MedDefnAltSrchParams> {
        return this.httpClient.get(`${this.medDefnAltSrchParamsUrl}/${criteriaSrchPriority}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnAltSrchParams),
                catchError(this.sharedService.handleError))
    }

    getMedDefnAltSrchParamssCount(): Observable<number> {
        var url = `${this.medDefnAltSrchParamsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMedDefnAltSrchParams(medDefnAltSrchParams : MedDefnAltSrchParams): Observable<any> {
        let body = JSON.stringify(medDefnAltSrchParams);
        return this.httpClient.post(this.medDefnAltSrchParamsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMedDefnAltSrchParams(medDefnAltSrchParams : MedDefnAltSrchParams, criteriaSrchPriority : number): Observable<any> {
        let body = JSON.stringify(medDefnAltSrchParams);
        return this.httpClient.put(`${this.medDefnAltSrchParamsUrl}/${criteriaSrchPriority}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMedDefnAltSrchParams(medDefnAltSrchParams : MedDefnAltSrchParams, criteriaSrchPriority : number): Observable<any> {
        let body = JSON.stringify(medDefnAltSrchParams);
        return this.httpClient.patch(`${this.medDefnAltSrchParamsUrl}/${criteriaSrchPriority}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMedDefnAltSrchParams(criteriaSrchPriority : number): Observable<any> {
        return this.httpClient.delete(`${this.medDefnAltSrchParamsUrl}/${criteriaSrchPriority}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}