/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimsTransmittalSetup } from '../api-models/claims-transmittal-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimsTransmittalSetupService {

    private claimsTransmittalSetupUrl: string = `${environment.apiUrl}/claimstransmittalsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimsTransmittalSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimsTransmittalSetup[]> {
        var url = `${this.claimsTransmittalSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsTransmittalSetup[]),
                catchError(this.sharedService.handleError))
    }

    getClaimsTransmittalSetup(seqCltrnId : number): Observable<ClaimsTransmittalSetup> {
        return this.httpClient.get(`${this.claimsTransmittalSetupUrl}/${seqCltrnId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsTransmittalSetup),
                catchError(this.sharedService.handleError))
    }

    getClaimsTransmittalSetupsCount(): Observable<number> {
        var url = `${this.claimsTransmittalSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCompanyCode(companyCode : string): Observable<ClaimsTransmittalSetup[]> {
        return this.httpClient.get(`${this.claimsTransmittalSetupUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsTransmittalSetup),
                catchError(this.sharedService.handleError))
    }




    createClaimsTransmittalSetup(claimsTransmittalSetup : ClaimsTransmittalSetup): Observable<any> {
        let body = JSON.stringify(claimsTransmittalSetup);
        return this.httpClient.post(this.claimsTransmittalSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimsTransmittalSetup(claimsTransmittalSetup : ClaimsTransmittalSetup, seqCltrnId : number): Observable<any> {
        let body = JSON.stringify(claimsTransmittalSetup);
        return this.httpClient.put(`${this.claimsTransmittalSetupUrl}/${seqCltrnId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimsTransmittalSetup(claimsTransmittalSetup : ClaimsTransmittalSetup, seqCltrnId : number): Observable<any> {
        let body = JSON.stringify(claimsTransmittalSetup);
        return this.httpClient.patch(`${this.claimsTransmittalSetupUrl}/${seqCltrnId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimsTransmittalSetup(seqCltrnId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimsTransmittalSetupUrl}/${seqCltrnId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}