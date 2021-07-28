/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DentalClaimDtlRemarks } from '../api-models/dental-claim-dtl-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DentalClaimDtlRemarksService {

    private dentalClaimDtlRemarksUrl: string = `${environment.apiUrl}/dentalclaimdtlremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDentalClaimDtlRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DentalClaimDtlRemarks[]> {
        var url = `${this.dentalClaimDtlRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimDtlRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getDentalClaimDtlRemarks(seqClaimId : number): Observable<DentalClaimDtlRemarks> {
        return this.httpClient.get(`${this.dentalClaimDtlRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimDtlRemarks),
                catchError(this.sharedService.handleError))
    }

    getDentalClaimDtlRemarkssCount(): Observable<number> {
        var url = `${this.dentalClaimDtlRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByRemarkCode(remarkCode : string): Observable<DentalClaimDtlRemarks[]> {
        return this.httpClient.get(`${this.dentalClaimDtlRemarksUrl}/find-by-remarkcode/${remarkCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimDtlRemarks),
                catchError(this.sharedService.handleError))
    }




    createDentalClaimDtlRemarks(dentalClaimDtlRemarks : DentalClaimDtlRemarks): Observable<any> {
        let body = JSON.stringify(dentalClaimDtlRemarks);
        return this.httpClient.post(this.dentalClaimDtlRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDentalClaimDtlRemarks(dentalClaimDtlRemarks : DentalClaimDtlRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(dentalClaimDtlRemarks);
        return this.httpClient.put(`${this.dentalClaimDtlRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDentalClaimDtlRemarks(dentalClaimDtlRemarks : DentalClaimDtlRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(dentalClaimDtlRemarks);
        return this.httpClient.patch(`${this.dentalClaimDtlRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDentalClaimDtlRemarks(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.dentalClaimDtlRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}