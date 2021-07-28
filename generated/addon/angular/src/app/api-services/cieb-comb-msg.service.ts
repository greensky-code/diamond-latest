/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCombMsg } from '../api-models/cieb-comb-msg.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebCombMsgService {

    private ciebCombMsgUrl: string = `${environment.apiUrl}/ciebcombmsgs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebCombMsgs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebCombMsg[]> {
        var url = `${this.ciebCombMsgUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCombMsg[]),
                catchError(this.sharedService.handleError))
    }

    getCiebCombMsg(seqMsgId : number): Observable<CiebCombMsg> {
        return this.httpClient.get(`${this.ciebCombMsgUrl}/${seqMsgId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebCombMsg),
                catchError(this.sharedService.handleError))
    }

    getCiebCombMsgsCount(): Observable<number> {
        var url = `${this.ciebCombMsgUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebCombMsg(ciebCombMsg : CiebCombMsg): Observable<any> {
        let body = JSON.stringify(ciebCombMsg);
        return this.httpClient.post(this.ciebCombMsgUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebCombMsg(ciebCombMsg : CiebCombMsg, seqMsgId : number): Observable<any> {
        let body = JSON.stringify(ciebCombMsg);
        return this.httpClient.put(`${this.ciebCombMsgUrl}/${seqMsgId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebCombMsg(ciebCombMsg : CiebCombMsg, seqMsgId : number): Observable<any> {
        let body = JSON.stringify(ciebCombMsg);
        return this.httpClient.patch(`${this.ciebCombMsgUrl}/${seqMsgId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebCombMsg(seqMsgId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebCombMsgUrl}/${seqMsgId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}