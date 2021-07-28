/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstClaimDetailRemarks } from '../api-models/inst-claim-detail-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstClaimDetailRemarksService {

    private instClaimDetailRemarksUrl: string = `${environment.apiUrl}/instclaimdetailremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimDetailRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstClaimDetailRemarks[]> {
        var url = `${this.instClaimDetailRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetailRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getInstClaimDetailRemarks(seqClaimId : number): Observable<InstClaimDetailRemarks> {
        return this.httpClient.get(`${this.instClaimDetailRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetailRemarks),
                catchError(this.sharedService.handleError))
    }

    getInstClaimDetailRemarkssCount(): Observable<number> {
        var url = `${this.instClaimDetailRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByRemarkCode(remarkCode : string): Observable<InstClaimDetailRemarks[]> {
        return this.httpClient.get(`${this.instClaimDetailRemarksUrl}/find-by-remarkcode/${remarkCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetailRemarks),
                catchError(this.sharedService.handleError))
    }




    createInstClaimDetailRemarks(instClaimDetailRemarks : InstClaimDetailRemarks): Observable<any> {
        let body = JSON.stringify(instClaimDetailRemarks);
        return this.httpClient.post(this.instClaimDetailRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstClaimDetailRemarks(instClaimDetailRemarks : InstClaimDetailRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimDetailRemarks);
        return this.httpClient.put(`${this.instClaimDetailRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstClaimDetailRemarks(instClaimDetailRemarks : InstClaimDetailRemarks, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimDetailRemarks);
        return this.httpClient.patch(`${this.instClaimDetailRemarksUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstClaimDetailRemarks(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimDetailRemarksUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}