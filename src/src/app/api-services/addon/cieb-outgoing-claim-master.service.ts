/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebOutgoingClaimMaster } from '../../api-models/addon/cieb-outgoing-claim-master.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebOutgoingClaimMasterService {

    private ciebOutgoingClaimMasterUrl: string = `${environment.apiUrl}/cieboutgoingclaimmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebOutgoingClaimMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebOutgoingClaimMaster[]> {
        var url = `${this.ciebOutgoingClaimMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebOutgoingClaimMaster[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getCiebOutgoingClaimMaster(seqClaimId : number): Observable<CiebOutgoingClaimMaster> {
        return this.httpClient.get(`${this.ciebOutgoingClaimMasterUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebOutgoingClaimMaster),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    existsCiebOutgoingClaimMaster(seqClaimId : number): Observable<CiebOutgoingClaimMaster> {
        return this.httpClient.get(`${this.ciebOutgoingClaimMasterUrl}/exists/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as Boolean),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getCiebOutgoingClaimMastersCount(): Observable<number> {
        var url = `${this.ciebOutgoingClaimMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }





    createCiebOutgoingClaimMaster(ciebOutgoingClaimMaster : CiebOutgoingClaimMaster): Observable<any> {
        let body = JSON.stringify(ciebOutgoingClaimMaster);
        return this.httpClient.post(this.ciebOutgoingClaimMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebOutgoingClaimMaster(ciebOutgoingClaimMaster : CiebOutgoingClaimMaster, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(ciebOutgoingClaimMaster);
        return this.httpClient.put(`${this.ciebOutgoingClaimMasterUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebOutgoingClaimMaster(ciebOutgoingClaimMaster : CiebOutgoingClaimMaster, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(ciebOutgoingClaimMaster);
        return this.httpClient.patch(`${this.ciebOutgoingClaimMasterUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    deleteCiebOutgoingClaimMaster(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebOutgoingClaimMasterUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
