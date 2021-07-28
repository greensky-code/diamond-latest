/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmdistributionsetS } from '../api-models/smdistributionset-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmdistributionsetSService {

    private smdistributionsetSUrl: string = `${environment.apiUrl}/smdistributionsetss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmdistributionsetSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmdistributionsetS[]> {
        var url = `${this.smdistributionsetSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmdistributionsetS[]),
                catchError(this.sharedService.handleError))
    }

    getSmdistributionsetS(namedobjectIdSequenceid : number): Observable<SmdistributionsetS> {
        return this.httpClient.get(`${this.smdistributionsetSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmdistributionsetS),
                catchError(this.sharedService.handleError))
    }

    getSmdistributionsetSsCount(): Observable<number> {
        var url = `${this.smdistributionsetSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmdistributionsetS(smdistributionsetS : SmdistributionsetS): Observable<any> {
        let body = JSON.stringify(smdistributionsetS);
        return this.httpClient.post(this.smdistributionsetSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmdistributionsetS(smdistributionsetS : SmdistributionsetS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdistributionsetS);
        return this.httpClient.put(`${this.smdistributionsetSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmdistributionsetS(smdistributionsetS : SmdistributionsetS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdistributionsetS);
        return this.httpClient.patch(`${this.smdistributionsetSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmdistributionsetS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smdistributionsetSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}