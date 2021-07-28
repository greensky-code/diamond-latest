/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimHoldDeterValues } from '../api-models/claim-hold-deter-values.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimHoldDeterValuesService {

    private claimHoldDeterValuesUrl: string = `${environment.apiUrl}/claimholddetervalueses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimHoldDeterValueses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimHoldDeterValues[]> {
        var url = `${this.claimHoldDeterValuesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimHoldDeterValues[]),
                catchError(this.sharedService.handleError))
    }

    getClaimHoldDeterValues(seqClhldRule : number): Observable<ClaimHoldDeterValues> {
        return this.httpClient.get(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimHoldDeterValues),
                catchError(this.sharedService.handleError))
    }

    getClaimHoldDeterValuesesCount(): Observable<number> {
        var url = `${this.claimHoldDeterValuesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimHoldDeterValues(claimHoldDeterValues : ClaimHoldDeterValues): Observable<any> {
        let body = JSON.stringify(claimHoldDeterValues);
        return this.httpClient.post(this.claimHoldDeterValuesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimHoldDeterValues(claimHoldDeterValues : ClaimHoldDeterValues, seqClhldRule : number): Observable<any> {
        let body = JSON.stringify(claimHoldDeterValues);
        return this.httpClient.put(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimHoldDeterValues(claimHoldDeterValues : ClaimHoldDeterValues, seqClhldRule : number): Observable<any> {
        let body = JSON.stringify(claimHoldDeterValues);
        return this.httpClient.patch(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimHoldDeterValues(seqClhldRule : number): Observable<any> {
        return this.httpClient.delete(`${this.claimHoldDeterValuesUrl}/${seqClhldRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}