/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstClaimHeaderRemarks } from '../api-models/inst-claim-header-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstClaimHeaderRemarksService {

    private instClaimHeaderRemarksUrl: string = `${environment.apiUrl}/instclaimheaderremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimHeaderRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstClaimHeaderRemarks[]> {
        var url = `${this.instClaimHeaderRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeaderRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getInstClaimHeaderRemarks(seqClaimId : number): Observable<InstClaimHeaderRemarks> {
        return this.httpClient.get(`${this.instClaimHeaderRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeaderRemarks),
                catchError(this.sharedService.handleError))
    }

    getInstClaimHeaderRemarkssCount(): Observable<number> {
        var url = `${this.instClaimHeaderRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByRemarkCode(remarkCode : string): Observable<InstClaimHeaderRemarks[]> {
        return this.httpClient.get(`${this.instClaimHeaderRemarksUrl}/find-by-remarkcode/${remarkCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeaderRemarks),
                catchError(this.sharedService.handleError))
    }
    findBySeqClaimId(seqClaimId : number): Observable<InstClaimHeaderRemarks[]> {
        return this.httpClient.get(`${this.instClaimHeaderRemarksUrl}/find-by-seqclaimid/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeaderRemarks),
                catchError(this.sharedService.handleError))
    }




    createInstClaimHeaderRemarks(instClaimHeaderRemarks : InstClaimHeaderRemarks): Observable<any> {
        let body = JSON.stringify(instClaimHeaderRemarks);
        return this.httpClient.post(this.instClaimHeaderRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstClaimHeaderRemarks(instClaimHeaderRemarks : InstClaimHeaderRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimHeaderRemarks);
        return this.httpClient.put(`${this.instClaimHeaderRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstClaimHeaderRemarks(instClaimHeaderRemarks : InstClaimHeaderRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimHeaderRemarks);
        return this.httpClient.patch(`${this.instClaimHeaderRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstClaimHeaderRemarks(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimHeaderRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}