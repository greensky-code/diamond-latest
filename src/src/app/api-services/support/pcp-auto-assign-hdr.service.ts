/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpAutoAssignHdr } from '../../api-models/index';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpAutoAssignHdrService {

    private pcpAutoAssignHdrUrl: string = `${environment.apiUrl}/pcpautoassignhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpAutoAssignHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpAutoAssignHdr[]> {
        var url = `${this.pcpAutoAssignHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignHdr[]),
                catchError(this.sharedService.handleError))
    }

    getPcpAutoAssignHdr(seqPcpAutoAssgn : number): Observable<PcpAutoAssignHdr> {
        return this.httpClient.get(`${this.pcpAutoAssignHdrUrl}/${seqPcpAutoAssgn}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignHdr),
                catchError(this.sharedService.handleError))
    }

    getPcpAutoAssignHdrsCount(): Observable<number> {
        var url = `${this.pcpAutoAssignHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<PcpAutoAssignHdr[]> {
        return this.httpClient.get(`${this.pcpAutoAssignHdrUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignHdr),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusinessAndEventType(lineOfBusiness : string, eventType: number): Observable<PcpAutoAssignHdr[]> {
        return this.httpClient.get(`${this.pcpAutoAssignHdrUrl}/find-by-lineofbusiness/${lineOfBusiness}/event-type/${eventType}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignHdr),
                catchError(this.sharedService.handleError))
    }

    createPcpAutoAssignHdr(pcpAutoAssignHdr : PcpAutoAssignHdr): Observable<any> {
        let body = JSON.stringify(pcpAutoAssignHdr);
        return this.httpClient.post(this.pcpAutoAssignHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpAutoAssignHdr(pcpAutoAssignHdr : PcpAutoAssignHdr, seqPcpAutoAssgn : number): Observable<any> {
        let body = JSON.stringify(pcpAutoAssignHdr);
        return this.httpClient.put(`${this.pcpAutoAssignHdrUrl}/${seqPcpAutoAssgn}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpAutoAssignHdr(pcpAutoAssignHdr : PcpAutoAssignHdr, seqPcpAutoAssgn : number): Observable<any> {
        let body = JSON.stringify(pcpAutoAssignHdr);
        return this.httpClient.patch(`${this.pcpAutoAssignHdrUrl}/${seqPcpAutoAssgn}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpAutoAssignHdr(seqPcpAutoAssgn : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpAutoAssignHdrUrl}/${seqPcpAutoAssgn}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
