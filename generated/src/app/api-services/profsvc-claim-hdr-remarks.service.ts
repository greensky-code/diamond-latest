/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimHdrRemarks } from '../api-models/profsvc-claim-hdr-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimHdrRemarksService {

    private profsvcClaimHdrRemarksUrl: string = `${environment.apiUrl}/profsvcclaimhdrremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimHdrRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimHdrRemarks[]> {
        var url = `${this.profsvcClaimHdrRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHdrRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHdrRemarks(seqClaimId : number): Observable<ProfsvcClaimHdrRemarks> {
        return this.httpClient.get(`${this.profsvcClaimHdrRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHdrRemarks),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHdrRemarkssCount(): Observable<number> {
        var url = `${this.profsvcClaimHdrRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByRemarkCode(remarkCode : string): Observable<ProfsvcClaimHdrRemarks[]> {
        return this.httpClient.get(`${this.profsvcClaimHdrRemarksUrl}/find-by-remarkcode/${remarkCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHdrRemarks),
                catchError(this.sharedService.handleError))
    }
    findBySeqClaimId(seqClaimId : number): Observable<ProfsvcClaimHdrRemarks[]> {
        return this.httpClient.get(`${this.profsvcClaimHdrRemarksUrl}/find-by-seqclaimid/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHdrRemarks),
                catchError(this.sharedService.handleError))
    }




    createProfsvcClaimHdrRemarks(profsvcClaimHdrRemarks : ProfsvcClaimHdrRemarks): Observable<any> {
        let body = JSON.stringify(profsvcClaimHdrRemarks);
        return this.httpClient.post(this.profsvcClaimHdrRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimHdrRemarks(profsvcClaimHdrRemarks : ProfsvcClaimHdrRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHdrRemarks);
        return this.httpClient.put(`${this.profsvcClaimHdrRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimHdrRemarks(profsvcClaimHdrRemarks : ProfsvcClaimHdrRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHdrRemarks);
        return this.httpClient.patch(`${this.profsvcClaimHdrRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimHdrRemarks(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimHdrRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}