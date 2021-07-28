/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DentalClaimHdrRemarks } from '../api-models/dental-claim-hdr-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DentalClaimHdrRemarksService {

    private dentalClaimHdrRemarksUrl: string = `${environment.apiUrl}/dentalclaimhdrremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDentalClaimHdrRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DentalClaimHdrRemarks[]> {
        var url = `${this.dentalClaimHdrRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHdrRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getDentalClaimHdrRemarks(seqClaimId : number): Observable<DentalClaimHdrRemarks> {
        return this.httpClient.get(`${this.dentalClaimHdrRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHdrRemarks),
                catchError(this.sharedService.handleError))
    }

    getDentalClaimHdrRemarkssCount(): Observable<number> {
        var url = `${this.dentalClaimHdrRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByRemarkCode(remarkCode : string): Observable<DentalClaimHdrRemarks[]> {
        return this.httpClient.get(`${this.dentalClaimHdrRemarksUrl}/find-by-remarkcode/${remarkCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHdrRemarks),
                catchError(this.sharedService.handleError))
    }
    findBySeqClaimId(seqClaimId : number): Observable<DentalClaimHdrRemarks[]> {
        return this.httpClient.get(`${this.dentalClaimHdrRemarksUrl}/find-by-seqclaimid/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHdrRemarks),
                catchError(this.sharedService.handleError))
    }




    createDentalClaimHdrRemarks(dentalClaimHdrRemarks : DentalClaimHdrRemarks): Observable<any> {
        let body = JSON.stringify(dentalClaimHdrRemarks);
        return this.httpClient.post(this.dentalClaimHdrRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDentalClaimHdrRemarks(dentalClaimHdrRemarks : DentalClaimHdrRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(dentalClaimHdrRemarks);
        return this.httpClient.put(`${this.dentalClaimHdrRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDentalClaimHdrRemarks(dentalClaimHdrRemarks : DentalClaimHdrRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(dentalClaimHdrRemarks);
        return this.httpClient.patch(`${this.dentalClaimHdrRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDentalClaimHdrRemarks(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.dentalClaimHdrRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}