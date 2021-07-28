/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundAllocatSetup } from '../api-models/cap-fund-allocat-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapFundAllocatSetupService {

    private capFundAllocatSetupUrl: string = `${environment.apiUrl}/capfundallocatsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFundAllocatSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapFundAllocatSetup[]> {
        var url = `${this.capFundAllocatSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFundAllocatSetup[]),
                catchError(this.sharedService.handleError))
    }

    getCapFundAllocatSetup(seqCfdstId : number): Observable<CapFundAllocatSetup> {
        return this.httpClient.get(`${this.capFundAllocatSetupUrl}/${seqCfdstId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundAllocatSetup),
                catchError(this.sharedService.handleError))
    }

    getCapFundAllocatSetupsCount(): Observable<number> {
        var url = `${this.capFundAllocatSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCapFundModelId(capFundModelId : string): Observable<CapFundAllocatSetup[]> {
        return this.httpClient.get(`${this.capFundAllocatSetupUrl}/find-by-capfundmodelid/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundAllocatSetup),
                catchError(this.sharedService.handleError))
    }




    createCapFundAllocatSetup(capFundAllocatSetup : CapFundAllocatSetup): Observable<any> {
        let body = JSON.stringify(capFundAllocatSetup);
        return this.httpClient.post(this.capFundAllocatSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapFundAllocatSetup(capFundAllocatSetup : CapFundAllocatSetup, seqCfdstId : number): Observable<any> {
        let body = JSON.stringify(capFundAllocatSetup);
        return this.httpClient.put(`${this.capFundAllocatSetupUrl}/${seqCfdstId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapFundAllocatSetup(capFundAllocatSetup : CapFundAllocatSetup, seqCfdstId : number): Observable<any> {
        let body = JSON.stringify(capFundAllocatSetup);
        return this.httpClient.patch(`${this.capFundAllocatSetupUrl}/${seqCfdstId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapFundAllocatSetup(seqCfdstId : number): Observable<any> {
        return this.httpClient.delete(`${this.capFundAllocatSetupUrl}/${seqCfdstId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}