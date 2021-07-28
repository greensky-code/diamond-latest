/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpaaJobRequest } from '../api-models/pcpaa-job-request.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpaaJobRequestService {

    private pcpaaJobRequestUrl: string = `${environment.apiUrl}/pcpaajobrequests`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaJobRequests(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpaaJobRequest[]> {
        var url = `${this.pcpaaJobRequestUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequest[]),
                catchError(this.sharedService.handleError))
    }

    getPcpaaJobRequest(seqPcpjbId : number): Observable<PcpaaJobRequest> {
        return this.httpClient.get(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequest),
                catchError(this.sharedService.handleError))
    }

    getPcpaaJobRequestsCount(): Observable<number> {
        var url = `${this.pcpaaJobRequestUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPcpaaJobRequest(pcpaaJobRequest : PcpaaJobRequest): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequest);
        return this.httpClient.post(this.pcpaaJobRequestUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpaaJobRequest(pcpaaJobRequest : PcpaaJobRequest, seqPcpjbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequest);
        return this.httpClient.put(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpaaJobRequest(pcpaaJobRequest : PcpaaJobRequest, seqPcpjbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequest);
        return this.httpClient.patch(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpaaJobRequest(seqPcpjbId : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}