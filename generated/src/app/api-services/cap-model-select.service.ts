/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapModelSelect } from '../api-models/cap-model-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapModelSelectService {

    private capModelSelectUrl: string = `${environment.apiUrl}/capmodelselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapModelSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapModelSelect[]> {
        var url = `${this.capModelSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapModelSelect[]),
                catchError(this.sharedService.handleError))
    }

    getCapModelSelect(capModelId : string): Observable<CapModelSelect> {
        return this.httpClient.get(`${this.capModelSelectUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapModelSelect),
                catchError(this.sharedService.handleError))
    }

    getCapModelSelectsCount(): Observable<number> {
        var url = `${this.capModelSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapModelSelect(capModelSelect : CapModelSelect): Observable<any> {
        let body = JSON.stringify(capModelSelect);
        return this.httpClient.post(this.capModelSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapModelSelect(capModelSelect : CapModelSelect, capModelId : string): Observable<any> {
        let body = JSON.stringify(capModelSelect);
        return this.httpClient.put(`${this.capModelSelectUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapModelSelect(capModelSelect : CapModelSelect, capModelId : string): Observable<any> {
        let body = JSON.stringify(capModelSelect);
        return this.httpClient.patch(`${this.capModelSelectUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapModelSelect(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capModelSelectUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}