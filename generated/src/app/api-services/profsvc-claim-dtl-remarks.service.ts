/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimDtlRemarks } from '../api-models/profsvc-claim-dtl-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimDtlRemarksService {

    private profsvcClaimDtlRemarksUrl: string = `${environment.apiUrl}/profsvcclaimdtlremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimDtlRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimDtlRemarks[]> {
        var url = `${this.profsvcClaimDtlRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDtlRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDtlRemarks(seqClaimId : number): Observable<ProfsvcClaimDtlRemarks> {
        return this.httpClient.get(`${this.profsvcClaimDtlRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDtlRemarks),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDtlRemarkssCount(): Observable<number> {
        var url = `${this.profsvcClaimDtlRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByRemarkCode(remarkCode : string): Observable<ProfsvcClaimDtlRemarks[]> {
        return this.httpClient.get(`${this.profsvcClaimDtlRemarksUrl}/find-by-remarkcode/${remarkCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDtlRemarks),
                catchError(this.sharedService.handleError))
    }




    createProfsvcClaimDtlRemarks(profsvcClaimDtlRemarks : ProfsvcClaimDtlRemarks): Observable<any> {
        let body = JSON.stringify(profsvcClaimDtlRemarks);
        return this.httpClient.post(this.profsvcClaimDtlRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimDtlRemarks(profsvcClaimDtlRemarks : ProfsvcClaimDtlRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimDtlRemarks);
        return this.httpClient.put(`${this.profsvcClaimDtlRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimDtlRemarks(profsvcClaimDtlRemarks : ProfsvcClaimDtlRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimDtlRemarks);
        return this.httpClient.patch(`${this.profsvcClaimDtlRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimDtlRemarks(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimDtlRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}