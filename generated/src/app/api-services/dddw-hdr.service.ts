/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DddwHdr } from '../api-models/dddw-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DddwHdrService {

    private dddwHdrUrl: string = `${environment.apiUrl}/dddwhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDddwHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DddwHdr[]> {
        var url = `${this.dddwHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DddwHdr[]),
                catchError(this.sharedService.handleError))
    }

    getDddwHdr(dwName : string): Observable<DddwHdr> {
        return this.httpClient.get(`${this.dddwHdrUrl}/${dwName}`, {observe: 'response'})
            .pipe(map(response => response.body as DddwHdr),
                catchError(this.sharedService.handleError))
    }

    getDddwHdrsCount(): Observable<number> {
        var url = `${this.dddwHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDddwHdr(dddwHdr : DddwHdr): Observable<any> {
        let body = JSON.stringify(dddwHdr);
        return this.httpClient.post(this.dddwHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDddwHdr(dddwHdr : DddwHdr, dwName : string): Observable<any> {
        let body = JSON.stringify(dddwHdr);
        return this.httpClient.put(`${this.dddwHdrUrl}/${dwName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDddwHdr(dddwHdr : DddwHdr, dwName : string): Observable<any> {
        let body = JSON.stringify(dddwHdr);
        return this.httpClient.patch(`${this.dddwHdrUrl}/${dwName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDddwHdr(dwName : string): Observable<any> {
        return this.httpClient.delete(`${this.dddwHdrUrl}/${dwName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}