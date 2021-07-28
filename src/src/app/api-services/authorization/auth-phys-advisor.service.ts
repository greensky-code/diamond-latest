/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {SharedService} from "../../shared/services/shared.service";
import {environment} from "../../../environments/environment";
import {AuthPhysAdvisor} from "../../api-models";

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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthPhysAdvisor(authNumber : number): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthPhysAdvisorsCount(): Observable<number> {
        var url = `${this.authPhysAdvisorUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvId(seqProvId : number): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAdvisorService(advisorService : string): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-advisorservice/${advisorService}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAdvisorDecision(advisorDecision : string): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-advisordecision/${advisorDecision}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByRecommendationCode(recommendationCode : string): Observable<AuthPhysAdvisor[]> {
        return this.httpClient.get(`${this.authPhysAdvisorUrl}/find-by-recommendationcode/${recommendationCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthPhysAdvisor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createAuthPhysAdvisor(authPhysAdvisor : AuthPhysAdvisor): Observable<any> {
        let body = JSON.stringify(authPhysAdvisor);
        return this.httpClient.post(this.authPhysAdvisorUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthPhysAdvisor(
        authPhysAdvisor : AuthPhysAdvisor, seqAuthAdv: number, secondaryAuthNo: string, authNumber : number): Observable<any> {
        let body = JSON.stringify(authPhysAdvisor);
        return this.httpClient.put(
            `${this.authPhysAdvisorUrl}/${seqAuthAdv}/${secondaryAuthNo}/${authNumber}`,
            body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthPhysAdvisor(authPhysAdvisor : AuthPhysAdvisor, authNumber : number): Observable<any> {
        let body = JSON.stringify(authPhysAdvisor);
        return this.httpClient.patch(`${this.authPhysAdvisorUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthPhysAdvisor(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authPhysAdvisorUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
