/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdeProfsvcClaimLenrxW } from '../api-models/ide-profsvc-claim-lenrx-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdeProfsvcClaimLenrxWService {

    private ideProfsvcClaimLenrxWUrl: string = `${environment.apiUrl}/ideprofsvcclaimlenrxws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdeProfsvcClaimLenrxWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdeProfsvcClaimLenrxW[]> {
        var url = `${this.ideProfsvcClaimLenrxWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimLenrxW[]),
                catchError(this.sharedService.handleError))
    }

    getIdeProfsvcClaimLenrxW(originalClaimNumber : string): Observable<IdeProfsvcClaimLenrxW> {
        return this.httpClient.get(`${this.ideProfsvcClaimLenrxWUrl}/${originalClaimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimLenrxW),
                catchError(this.sharedService.handleError))
    }

    getIdeProfsvcClaimLenrxWsCount(): Observable<number> {
        var url = `${this.ideProfsvcClaimLenrxWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByOriginalClaimNumber(originalClaimNumber : string): Observable<IdeProfsvcClaimLenrxW[]> {
        return this.httpClient.get(`${this.ideProfsvcClaimLenrxWUrl}/find-by-originalclaimnumber/${originalClaimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimLenrxW),
                catchError(this.sharedService.handleError))
    }




    createIdeProfsvcClaimLenrxW(ideProfsvcClaimLenrxW : IdeProfsvcClaimLenrxW): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimLenrxW);
        return this.httpClient.post(this.ideProfsvcClaimLenrxWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdeProfsvcClaimLenrxW(ideProfsvcClaimLenrxW : IdeProfsvcClaimLenrxW, originalClaimNumber : string): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimLenrxW);
        return this.httpClient.put(`${this.ideProfsvcClaimLenrxWUrl}/${originalClaimNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdeProfsvcClaimLenrxW(ideProfsvcClaimLenrxW : IdeProfsvcClaimLenrxW, originalClaimNumber : string): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimLenrxW);
        return this.httpClient.patch(`${this.ideProfsvcClaimLenrxWUrl}/${originalClaimNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdeProfsvcClaimLenrxW(originalClaimNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.ideProfsvcClaimLenrxWUrl}/${originalClaimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}