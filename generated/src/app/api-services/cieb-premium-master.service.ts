/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebPremiumMaster } from '../api-models/cieb-premium-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebPremiumMasterService {

    private ciebPremiumMasterUrl: string = `${environment.apiUrl}/ciebpremiummasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPremiumMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebPremiumMaster[]> {
        var url = `${this.ciebPremiumMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPremiumMaster[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPremiumMaster(seqPremId : number): Observable<CiebPremiumMaster> {
        return this.httpClient.get(`${this.ciebPremiumMasterUrl}/${seqPremId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPremiumMaster),
                catchError(this.sharedService.handleError))
    }

    getCiebPremiumMastersCount(): Observable<number> {
        var url = `${this.ciebPremiumMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebPremiumMaster(ciebPremiumMaster : CiebPremiumMaster): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.post(this.ciebPremiumMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebPremiumMaster(ciebPremiumMaster : CiebPremiumMaster, seqPremId : number): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.put(`${this.ciebPremiumMasterUrl}/${seqPremId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPremiumMaster(ciebPremiumMaster : CiebPremiumMaster, seqPremId : number): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.patch(`${this.ciebPremiumMasterUrl}/${seqPremId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPremiumMaster(seqPremId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebPremiumMasterUrl}/${seqPremId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}