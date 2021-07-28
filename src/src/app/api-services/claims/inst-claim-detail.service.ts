/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment'
import {SharedService} from '../../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';
import {InstClaimDetail} from "../../api-models/claims/inst-claim-detail.model";

@Injectable({
    providedIn: "root"
})

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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getInstClaimDetail(seqClaimId : number): Observable<InstClaimDetail> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getInstClaimDetailsCount(): Observable<number> {
        var url = `${this.instClaimDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByCapFundModelId(capFundModelId : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-capfundmodelid/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqClaimId(seqClaimId : number): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-seqclaimid/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByCompanyCode(companyCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByMedDefCode(medDefCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-meddefcode/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByProcedureCode(procedureCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-procedurecode/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqMembId(seqMembId : number): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvId(seqProvId : number): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByNotCoveredReason(notCoveredReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-notcoveredreason/${notCoveredReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByHoldReason3(holdReason3 : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-holdreason3/${holdReason3}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByHoldReason2(holdReason2 : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-holdreason2/${holdReason2}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDeductibleReason(deductibleReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-deductiblereason/${deductibleReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByCopay2Reason(copay2Reason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-copay2reason/${copay2Reason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByCopay1Reason(copay1Reason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-copay1reason/${copay1Reason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAdjustmentReason(adjustmentReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-adjustmentreason/${adjustmentReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAlternateProcCode(alternateProcCode : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-alternateproccode/${alternateProcCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByOtherCarrierRsn(otherCarrierRsn : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-othercarrierrsn/${otherCarrierRsn}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByHoldReason1(holdReason1 : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-holdreason1/${holdReason1}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAllowedReason(allowedReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-allowedreason/${allowedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByBmaReason(bmaReason : string): Observable<InstClaimDetail[]> {
        return this.httpClient.get(`${this.instClaimDetailUrl}/find-by-bmareason/${bmaReason}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createInstClaimDetail(instClaimDetail : InstClaimDetail): Observable<any> {
        let body = JSON.stringify(instClaimDetail);
        return this.httpClient.post(this.instClaimDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateInstClaimDetail(instClaimDetail : InstClaimDetail, subLineCode: string, lineNumber: number, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimDetail);
        return this.httpClient.put(`${this.instClaimDetailUrl}/${subLineCode}/${lineNumber}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateInstClaimDetail(instClaimDetail : InstClaimDetail, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimDetail);
        return this.httpClient.patch(`${this.instClaimDetailUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteInstClaimDetail(subLineCode: any, lineNumber: any, seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimDetailUrl}/${subLineCode}/${lineNumber}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
