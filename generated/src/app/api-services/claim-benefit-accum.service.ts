/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimBenefitAccum } from '../api-models/claim-benefit-accum.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimBenefitAccumService {

    private claimBenefitAccumUrl: string = `${environment.apiUrl}/claimbenefitaccums`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimBenefitAccums(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimBenefitAccum[]> {
        var url = `${this.claimBenefitAccumUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimBenefitAccum[]),
                catchError(this.sharedService.handleError))
    }

    getClaimBenefitAccum(seqAccumId : number): Observable<ClaimBenefitAccum> {
        return this.httpClient.get(`${this.claimBenefitAccumUrl}/${seqAccumId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimBenefitAccum),
                catchError(this.sharedService.handleError))
    }

    getClaimBenefitAccumsCount(): Observable<number> {
        var url = `${this.claimBenefitAccumUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBenefitPackageId(benefitPackageId : string): Observable<ClaimBenefitAccum[]> {
        return this.httpClient.get(`${this.claimBenefitAccumUrl}/find-by-benefitpackageid/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimBenefitAccum),
                catchError(this.sharedService.handleError))
    }
    findByRuleId(ruleId : string): Observable<ClaimBenefitAccum[]> {
        return this.httpClient.get(`${this.claimBenefitAccumUrl}/find-by-ruleid/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimBenefitAccum),
                catchError(this.sharedService.handleError))
    }




    createClaimBenefitAccum(claimBenefitAccum : ClaimBenefitAccum): Observable<any> {
        let body = JSON.stringify(claimBenefitAccum);
        return this.httpClient.post(this.claimBenefitAccumUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimBenefitAccum(claimBenefitAccum : ClaimBenefitAccum, seqAccumId : number): Observable<any> {
        let body = JSON.stringify(claimBenefitAccum);
        return this.httpClient.put(`${this.claimBenefitAccumUrl}/${seqAccumId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimBenefitAccum(claimBenefitAccum : ClaimBenefitAccum, seqAccumId : number): Observable<any> {
        let body = JSON.stringify(claimBenefitAccum);
        return this.httpClient.patch(`${this.claimBenefitAccumUrl}/${seqAccumId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimBenefitAccum(seqAccumId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimBenefitAccumUrl}/${seqAccumId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}