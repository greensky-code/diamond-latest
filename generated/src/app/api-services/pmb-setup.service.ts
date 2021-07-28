/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSetup } from '../api-models/pmb-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSetupService {

    private pmbSetupUrl: string = `${environment.apiUrl}/pmbsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSetup[]> {
        var url = `${this.pmbSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSetup[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSetup(seqGpbilId : number): Observable<PmbSetup> {
        return this.httpClient.get(`${this.pmbSetupUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSetup),
                catchError(this.sharedService.handleError))
    }

    getPmbSetupsCount(): Observable<number> {
        var url = `${this.pmbSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSetup(pmbSetup : PmbSetup): Observable<any> {
        let body = JSON.stringify(pmbSetup);
        return this.httpClient.post(this.pmbSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSetup(pmbSetup : PmbSetup, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSetup);
        return this.httpClient.put(`${this.pmbSetupUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSetup(pmbSetup : PmbSetup, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSetup);
        return this.httpClient.patch(`${this.pmbSetupUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSetup(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSetupUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}