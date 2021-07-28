/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuclsSetup } from '../api-models/aucls-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuclsSetupService {

    private auclsSetupUrl: string = `${environment.apiUrl}/auclssetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuclsSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuclsSetup[]> {
        var url = `${this.auclsSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuclsSetup[]),
                catchError(this.sharedService.handleError))
    }

    getAuclsSetup(seqAuclsJobId : string): Observable<AuclsSetup> {
        return this.httpClient.get(`${this.auclsSetupUrl}/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsSetup),
                catchError(this.sharedService.handleError))
    }

    getAuclsSetupsCount(): Observable<number> {
        var url = `${this.auclsSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuclsSetup(auclsSetup : AuclsSetup): Observable<any> {
        let body = JSON.stringify(auclsSetup);
        return this.httpClient.post(this.auclsSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuclsSetup(auclsSetup : AuclsSetup, seqAuclsJobId : string): Observable<any> {
        let body = JSON.stringify(auclsSetup);
        return this.httpClient.put(`${this.auclsSetupUrl}/${seqAuclsJobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuclsSetup(auclsSetup : AuclsSetup, seqAuclsJobId : string): Observable<any> {
        let body = JSON.stringify(auclsSetup);
        return this.httpClient.patch(`${this.auclsSetupUrl}/${seqAuclsJobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuclsSetup(seqAuclsJobId : string): Observable<any> {
        return this.httpClient.delete(`${this.auclsSetupUrl}/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}