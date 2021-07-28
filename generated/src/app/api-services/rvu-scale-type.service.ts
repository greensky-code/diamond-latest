/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RvuScaleType } from '../api-models/rvu-scale-type.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RvuScaleTypeService {

    private rvuScaleTypeUrl: string = `${environment.apiUrl}/rvuscaletypes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getRvuScaleTypes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<RvuScaleType[]> {
        var url = `${this.rvuScaleTypeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as RvuScaleType[]),
                catchError(this.sharedService.handleError))
    }

    getRvuScaleType(rvuScaleId : string): Observable<RvuScaleType> {
        return this.httpClient.get(`${this.rvuScaleTypeUrl}/${rvuScaleId}`, {observe: 'response'})
            .pipe(map(response => response.body as RvuScaleType),
                catchError(this.sharedService.handleError))
    }

    getRvuScaleTypesCount(): Observable<number> {
        var url = `${this.rvuScaleTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createRvuScaleType(rvuScaleType : RvuScaleType): Observable<any> {
        let body = JSON.stringify(rvuScaleType);
        return this.httpClient.post(this.rvuScaleTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateRvuScaleType(rvuScaleType : RvuScaleType, rvuScaleId : string): Observable<any> {
        let body = JSON.stringify(rvuScaleType);
        return this.httpClient.put(`${this.rvuScaleTypeUrl}/${rvuScaleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateRvuScaleType(rvuScaleType : RvuScaleType, rvuScaleId : string): Observable<any> {
        let body = JSON.stringify(rvuScaleType);
        return this.httpClient.patch(`${this.rvuScaleTypeUrl}/${rvuScaleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteRvuScaleType(rvuScaleId : string): Observable<any> {
        return this.httpClient.delete(`${this.rvuScaleTypeUrl}/${rvuScaleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}