/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstClaimDetail } from '../api-models/inst-claim-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstClaimDetailService {

    private instClaimDetailUrl: string = `${environment.apiUrl}/instclaimdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstClaimDetail[]> {
        var url = `${this.instClaimDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail[]),
                catchError(this.sharedService.handleError))
    }

    getInstClaimDetail(seqClaimId : number): Observable<InstClaimDetail> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }

    getInstClaimDetailsCount(): Observable<number> {
        var url = `${this.instClaimDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCapFundModelId(capFundModelId : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-capfundmodelid/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqClaimId(seqClaimId : number): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-seqclaimid/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCode(companyCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByMedDefCode(medDefCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-meddefcode/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByProcedureCode(procedureCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-procedurecode/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqMembId(seqMembId : number): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByOtherCarrierRsn(otherCarrierRsn : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-othercarrierrsn/${otherCarrierRsn}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByNotCoveredReason(notCoveredReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-notcoveredreason/${notCoveredReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason3(holdReason3 : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-holdreason3/${holdReason3}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason2(holdReason2 : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-holdreason2/${holdReason2}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByDeductibleReason(deductibleReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-deductiblereason/${deductibleReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByCopay2Reason(copay2Reason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-copay2reason/${copay2Reason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByCopay1Reason(copay1Reason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-copay1reason/${copay1Reason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByAdjustmentReason(adjustmentReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-adjustmentreason/${adjustmentReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByAlternateProcCode(alternateProcCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-alternateproccode/${alternateProcCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByOtherCarrierRsn(otherCarrierRsn : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-othercarrierrsn/${otherCarrierRsn}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason1(holdReason1 : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-holdreason1/${holdReason1}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByAllowedReason(allowedReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-allowedreason/${allowedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }
    findByBmaReason(bmaReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-bmareason/${bmaReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError(this.sharedService.handleError))
    }




    createInstClaimDetail(instClaimDetail : InstClaimDetail): Observable<any> {
        let body = JSON.stringify(instClaimDetail);
        return this.httpClient.post(this.instClaimDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstClaimDetail(instClaimDetail : InstClaimDetail, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimDetail);
        return this.httpClient.put(`${this.instClaimDetailUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstClaimDetail(instClaimDetail : InstClaimDetail, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimDetail);
        return this.httpClient.patch(`${this.instClaimDetailUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstClaimDetail(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimDetailUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}