/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdeProfsvcClaimHeaderW } from '../api-models/ide-profsvc-claim-header-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdeProfsvcClaimHeaderWService {

    private ideProfsvcClaimHeaderWUrl: string = `${environment.apiUrl}/ideprofsvcclaimheaderws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdeProfsvcClaimHeaderWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdeProfsvcClaimHeaderW[]> {
        var url = `${this.ideProfsvcClaimHeaderWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimHeaderW[]),
                catchError(this.sharedService.handleError))
    }

    getIdeProfsvcClaimHeaderW(originalClaimNumber : string): Observable<IdeProfsvcClaimHeaderW> {
        return this.httpClient.get(`${this.ideProfsvcClaimHeaderWUrl}/${originalClaimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimHeaderW),
                catchError(this.sharedService.handleError))
    }

    getIdeProfsvcClaimHeaderWsCount(): Observable<number> {
        var url = `${this.ideProfsvcClaimHeaderWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createIdeProfsvcClaimHeaderW(ideProfsvcClaimHeaderW : IdeProfsvcClaimHeaderW): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimHeaderW);
        return this.httpClient.post(this.ideProfsvcClaimHeaderWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdeProfsvcClaimHeaderW(ideProfsvcClaimHeaderW : IdeProfsvcClaimHeaderW, originalClaimNumber : string): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimHeaderW);
        return this.httpClient.put(`${this.ideProfsvcClaimHeaderWUrl}/${originalClaimNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdeProfsvcClaimHeaderW(ideProfsvcClaimHeaderW : IdeProfsvcClaimHeaderW, originalClaimNumber : string): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimHeaderW);
        return this.httpClient.patch(`${this.ideProfsvcClaimHeaderWUrl}/${originalClaimNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdeProfsvcClaimHeaderW(originalClaimNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.ideProfsvcClaimHeaderWUrl}/${originalClaimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}