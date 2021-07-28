/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

@Injectable({
    providedIn: "root"
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitRuleMaint(benefitPackageId : string): Observable<BenefitRuleMaint> {
        return this.httpClient.get(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRuleMaint),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitRuleMaintsCount(): Observable<number> {
        var url = `${this.benefitRuleMaintUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByBenefitRule(benefitRule : string): Observable<BenefitRuleMaint[]> {
        return this.httpClient.get(`${this.benefitRuleMaintUrl}/find-by-benefitrule/${benefitRule}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRuleMaint),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
      findbyBenefitPackageId(benefitPackageId : string): Observable<BenefitRuleMaint[]> {
        return this.httpClient.get(`${this.benefitRuleMaintUrl}/find-by-benefitPackgeId/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRuleMaint),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createBenefitRuleMaint(benefitRuleMaint : BenefitRuleMaint): Observable<any> {
        let body = JSON.stringify(benefitRuleMaint);
        return this.httpClient.post(this.benefitRuleMaintUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitRuleMaint(benefitRuleMaint : BenefitRuleMaint, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitRuleMaint);
        return this.httpClient.put(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateBenefitRuleMaint(benefitRuleMaint : BenefitRuleMaint, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitRuleMaint);
        return this.httpClient.patch(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteBenefitRuleMaint(benefitPackageId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitRuleMaintUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitRuleMaints(requestData: any[]): Observable<any> {
        let body = JSON.stringify(requestData);
        const url = `${this.benefitRuleMaintUrl}/updateBenefitRuleMaints`
        return this.httpClient.post(url, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }
    getBenefitRulesMaints_values(ruleId:string,benefitPackageId:string,seq_ben_package:string): Observable<any> {
        let params = new HttpParams();
                params = params.append('ruleId', ruleId);
                params = params.append('benefitPackageId', benefitPackageId);
        params = params.append('seq_ben_package', seq_ben_package);
        return this.httpClient.get(`${this.benefitRuleMaintUrl}/find-benfitRules_values`, {
            params: params,
            headers: this.contentHeaders
        }).pipe(map(resp => resp),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
   
}
