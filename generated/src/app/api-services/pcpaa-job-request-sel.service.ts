/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpaaJobRequestSel } from '../api-models/pcpaa-job-request-sel.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpaaJobRequestSelService {

    private pcpaaJobRequestSelUrl: string = `${environment.apiUrl}/pcpaajobrequestsels`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaJobRequestSels(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpaaJobRequestSel[]> {
        var url = `${this.pcpaaJobRequestSelUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequestSel[]),
                catchError(this.sharedService.handleError))
    }

    getPcpaaJobRequestSel(seqPcpjbId : number): Observable<PcpaaJobRequestSel> {
        return this.httpClient.get(`${this.pcpaaJobRequestSelUrl}/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequestSel),
                catchError(this.sharedService.handleError))
    }

    getPcpaaJobRequestSelsCount(): Observable<number> {
        var url = `${this.pcpaaJobRequestSelUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqPcpjbId(seqPcpjbId : number): Observable<PcpaaJobRequestSel[]> {
        return this.httpClient.get(`${this.pcpaaJobRequestSelUrl}/find-by-seqpcpjbid/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaJobRequestSel),
                catchError(this.sharedService.handleError))
    }




    createPcpaaJobRequestSel(pcpaaJobRequestSel : PcpaaJobRequestSel): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequestSel);
        return this.httpClient.post(this.pcpaaJobRequestSelUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpaaJobRequestSel(pcpaaJobRequestSel : PcpaaJobRequestSel, seqPcpjbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequestSel);
        return this.httpClient.put(`${this.pcpaaJobRequestSelUrl}/${seqPcpjbId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpaaJobRequestSel(pcpaaJobRequestSel : PcpaaJobRequestSel, seqPcpjbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaJobRequestSel);
        return this.httpClient.patch(`${this.pcpaaJobRequestSelUrl}/${seqPcpjbId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpaaJobRequestSel(seqPcpjbId : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaJobRequestSelUrl}/${seqPcpjbId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}