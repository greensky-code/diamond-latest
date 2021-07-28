/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitRuleMaint } from '../api-models/benefit-rule-maint.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BenefitRuleMaintService {

    private benefitRuleMaintUrl: string = `${environment.apiUrl}/benefitrulemaints`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitRuleMaints(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BenefitRuleMaint[]> {
        var url = `${this.benefitRuleMaintUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRuleMaint[]),
                catchError(this.sharedService.handleError))
    }

    getBenefitRuleMaint(benefitPackageId : string): Observable<BenefitRuleMaint> {
        return this.httpClient.get(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRuleMaint),
                catchError(this.sharedService.handleError))
    }

    getBenefitRuleMaintsCount(): Observable<number> {
        var url = `${this.benefitRuleMaintUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBenefitRule(benefitRule : string): Observable<BenefitRuleMaint[]> {
        return this.httpClient.get(`${this.benefitRuleMaintUrl}/find-by-benefitrule/${benefitRule}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRuleMaint),
                catchError(this.sharedService.handleError))
    }




    createBenefitRuleMaint(benefitRuleMaint : BenefitRuleMaint): Observable<any> {
        let body = JSON.stringify(benefitRuleMaint);
        return this.httpClient.post(this.benefitRuleMaintUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBenefitRuleMaint(benefitRuleMaint : BenefitRuleMaint, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitRuleMaint);
        return this.httpClient.put(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBenefitRuleMaint(benefitRuleMaint : BenefitRuleMaint, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitRuleMaint);
        return this.httpClient.patch(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBenefitRuleMaint(benefitPackageId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
