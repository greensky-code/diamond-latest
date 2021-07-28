/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthPhysAdvisor } from '../api-models/auth-phys-advisor.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthPhysAdvisorService {

    private authPhysAdvisorUrl: string = `${environment.apiUrl}/authphysadvisors`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthPhysAdvisors(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthPhysAdvisor[]> {
        var url = `${this.authPhysAdvisorUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor[]),
                catchError(this.sharedService.handleError))
    }

    getAuthPhysAdvisor(authNumber : number): Observable<AuthPhysAdvisor> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError(this.sharedService.handleError))
    }

    getAuthPhysAdvisorsCount(): Observable<number> {
        var url = `${this.authPhysAdvisorUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId : number): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError(this.sharedService.handleError))
    }
    findByAdvisorService(advisorService : string): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-advisorservice/${advisorService}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError(this.sharedService.handleError))
    }
    findByAdvisorDecision(advisorDecision : string): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-advisordecision/${advisorDecision}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError(this.sharedService.handleError))
    }
    findByRecommendationCode(recommendationCode : string): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-recommendationcode/${recommendationCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError(this.sharedService.handleError))
    }




    createAuthPhysAdvisor(authPhysAdvisor : AuthPhysAdvisor): Observable<any> {
        let body = JSON.stringify(authPhysAdvisor);
        return this.httpClient.post(this.authPhysAdvisorUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthPhysAdvisor(authPhysAdvisor : AuthPhysAdvisor, authNumber : number): Observable<any> {
        let body = JSON.stringify(authPhysAdvisor);
        return this.httpClient.put(`${this.authPhysAdvisorUrl}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthPhysAdvisor(authPhysAdvisor : AuthPhysAdvisor, authNumber : number): Observable<any> {
        let body = JSON.stringify(authPhysAdvisor);
        return this.httpClient.patch(`${this.authPhysAdvisorUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthPhysAdvisor(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authPhysAdvisorUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}