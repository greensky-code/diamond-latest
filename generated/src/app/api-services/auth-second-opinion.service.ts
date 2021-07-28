/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthSecondOpinion } from '../api-models/auth-second-opinion.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthSecondOpinionService {

    private authSecondOpinionUrl: string = `${environment.apiUrl}/authsecondopinions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthSecondOpinions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthSecondOpinion[]> {
        var url = `${this.authSecondOpinionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion[]),
                catchError(this.sharedService.handleError))
    }

    getAuthSecondOpinion(authNumber : number): Observable<AuthSecondOpinion> {
        return this.httpClient.get(`${this.authSecondOpinionUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion),
                catchError(this.sharedService.handleError))
    }

    getAuthSecondOpinionsCount(): Observable<number> {
        var url = `${this.authSecondOpinionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySecondOpinionDate(secondOpinionDate : Date): Observable<AuthSecondOpinion[]> {
        return this.httpClient.get(`${this.authSecondOpinionUrl}/find-by-secondopiniondate/${secondOpinionDate}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<AuthSecondOpinion[]> {
        return this.httpClient.get(`${this.authSecondOpinionUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion),
                catchError(this.sharedService.handleError))
    }
    findByStatusReason(statusReason : string): Observable<AuthSecondOpinion[]> {
        return this.httpClient.get(`${this.authSecondOpinionUrl}/find-by-statusreason/${statusReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion),
                catchError(this.sharedService.handleError))
    }
    findBySecondOpinionDate(secondOpinionDate : Date): Observable<AuthSecondOpinion[]> {
        return this.httpClient.get(`${this.authSecondOpinionUrl}/find-by-secondopiniondate/${secondOpinionDate}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion),
                catchError(this.sharedService.handleError))
    }
    findByDecision(decision : string): Observable<AuthSecondOpinion[]> {
        return this.httpClient.get(`${this.authSecondOpinionUrl}/find-by-decision/${decision}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthSecondOpinion),
                catchError(this.sharedService.handleError))
    }




    createAuthSecondOpinion(authSecondOpinion : AuthSecondOpinion): Observable<any> {
        let body = JSON.stringify(authSecondOpinion);
        return this.httpClient.post(this.authSecondOpinionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthSecondOpinion(authSecondOpinion : AuthSecondOpinion, authNumber : number): Observable<any> {
        let body = JSON.stringify(authSecondOpinion);
        return this.httpClient.put(`${this.authSecondOpinionUrl}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthSecondOpinion(authSecondOpinion : AuthSecondOpinion, authNumber : number): Observable<any> {
        let body = JSON.stringify(authSecondOpinion);
        return this.httpClient.patch(`${this.authSecondOpinionUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthSecondOpinion(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authSecondOpinionUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}