/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { catchError, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {PcpaaJobRequest} from '../../api-models/support/pcpaa-job-request.model';

@Injectable()
export class PcpaaJobRequestService {

    private pcpaaJobRequestUrl = `${environment.apiUrl}/pcpaajobrequests`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaJobRequests(usePagination= false, page = 0, size = 0): Observable<PcpaaJobRequest[]> {
        let url = `${this.pcpaaJobRequestUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequest[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPcpaaJobRequest(seqPcpjbId: number): Observable<PcpaaJobRequest> {
        return this.httpClient.get(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequest),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPcpaaJobRequestsCount(): Observable<number> {
        let url = `${this.pcpaaJobRequestUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPcpaaJobRequest(pcpaaJobRequest: PcpaaJobRequest): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequest);
        return this.httpClient.post(this.pcpaaJobRequestUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePcpaaJobRequest(pcpaaJobRequest: PcpaaJobRequest, seqPcpjbId: number): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequest);
        return this.httpClient.put(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePcpaaJobRequest(pcpaaJobRequest: PcpaaJobRequest, seqPcpjbId: number): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequest);
        return this.httpClient.patch(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePcpaaJobRequest(seqPcpjbId: number): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaJobRequestUrl}/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
