/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapEntitySelect } from '../api-models/cap-entity-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapEntitySelectService {

    private capEntitySelectUrl: string = `${environment.apiUrl}/capentityselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapEntitySelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapEntitySelect[]> {
        var url = `${this.capEntitySelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapEntitySelect[]),
                catchError(this.sharedService.handleError))
    }

    getCapEntitySelect(capModelId : string): Observable<CapEntitySelect> {
        return this.httpClient.get(`${this.capEntitySelectUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntitySelect),
                catchError(this.sharedService.handleError))
    }

    getCapEntitySelectsCount(): Observable<number> {
        var url = `${this.capEntitySelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapEntitySelect(capEntitySelect : CapEntitySelect): Observable<any> {
        let body = JSON.stringify(capEntitySelect);
        return this.httpClient.post(this.capEntitySelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapEntitySelect(capEntitySelect : CapEntitySelect, capModelId : string): Observable<any> {
        let body = JSON.stringify(capEntitySelect);
        return this.httpClient.put(`${this.capEntitySelectUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapEntitySelect(capEntitySelect : CapEntitySelect, capModelId : string): Observable<any> {
        let body = JSON.stringify(capEntitySelect);
        return this.httpClient.patch(`${this.capEntitySelectUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapEntitySelect(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capEntitySelectUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}