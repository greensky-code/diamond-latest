/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdeProfsvcClaimDetailW } from '../api-models/ide-profsvc-claim-detail-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdeProfsvcClaimDetailWService {

    private ideProfsvcClaimDetailWUrl: string = `${environment.apiUrl}/ideprofsvcclaimdetailws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdeProfsvcClaimDetailWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdeProfsvcClaimDetailW[]> {
        var url = `${this.ideProfsvcClaimDetailWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimDetailW[]),
                catchError(this.sharedService.handleError))
    }

    getIdeProfsvcClaimDetailW(lineNumber : number): Observable<IdeProfsvcClaimDetailW> {
        return this.httpClient.get(`${this.ideProfsvcClaimDetailWUrl}/${lineNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimDetailW),
                catchError(this.sharedService.handleError))
    }

    getIdeProfsvcClaimDetailWsCount(): Observable<number> {
        var url = `${this.ideProfsvcClaimDetailWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByOriginalClaimNumber(originalClaimNumber : string): Observable<IdeProfsvcClaimDetailW[]> {
        return this.httpClient.get(`${this.ideProfsvcClaimDetailWUrl}/find-by-originalclaimnumber/${originalClaimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as IdeProfsvcClaimDetailW),
                catchError(this.sharedService.handleError))
    }




    createIdeProfsvcClaimDetailW(ideProfsvcClaimDetailW : IdeProfsvcClaimDetailW): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimDetailW);
        return this.httpClient.post(this.ideProfsvcClaimDetailWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdeProfsvcClaimDetailW(ideProfsvcClaimDetailW : IdeProfsvcClaimDetailW, lineNumber : number): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimDetailW);
        return this.httpClient.put(`${this.ideProfsvcClaimDetailWUrl}/${lineNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdeProfsvcClaimDetailW(ideProfsvcClaimDetailW : IdeProfsvcClaimDetailW, lineNumber : number): Observable<any> {
        let body = JSON.stringify(ideProfsvcClaimDetailW);
        return this.httpClient.patch(`${this.ideProfsvcClaimDetailWUrl}/${lineNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdeProfsvcClaimDetailW(lineNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.ideProfsvcClaimDetailWUrl}/${lineNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}