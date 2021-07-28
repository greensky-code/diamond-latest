/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BenefProcessOrderDetail } from '../api-models/benef-process-order-detail.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BenefProcessOrderDetailService {

    private benefProcessOrderDetailUrl: string = `${environment.apiUrl}/benefprocessorderdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefProcessOrderDetails(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefProcessOrderDetail[]> {
        var url = `${this.benefProcessOrderDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as BenefProcessOrderDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefProcessOrderDetail(seqProcessingOrderId: number): Observable<BenefProcessOrderDetail[]> {
        return this.httpClient.get(`${this.benefProcessOrderDetailUrl}/${seqProcessingOrderId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefProcessOrderDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefProcessOrderDetailsCount(): Observable<number> {
        var url = `${this.benefProcessOrderDetailUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createBenefProcessOrderDetail(benefProcessOrderDetail: BenefProcessOrderDetail): Observable<any> {
        let body = JSON.stringify(benefProcessOrderDetail);
        return this.httpClient.post(this.benefProcessOrderDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefProcessOrderDetail(benefProcessOrderDetail: BenefProcessOrderDetail, seqProcessingOrderId: number): Observable<any> {
        let body = JSON.stringify(benefProcessOrderDetail);
        return this.httpClient.put(`${this.benefProcessOrderDetailUrl}/${seqProcessingOrderId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateBenefProcessOrderDetail(benefProcessOrderDetail: BenefProcessOrderDetail, seqProcessingOrderId: number): Observable<any> {
        let body = JSON.stringify(benefProcessOrderDetail);
        return this.httpClient.patch(`${this.benefProcessOrderDetailUrl}/${seqProcessingOrderId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    deleteBenefProcessOrderDetail(seqProcessingOrderId: number): Observable<any> {
        return this.httpClient.delete(`${this.benefProcessOrderDetailUrl}/${seqProcessingOrderId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitProcessOrderDetailList(benefProcessOrderDetails: BenefProcessOrderDetail[], seqProcessingOrderId: number): Observable<any> {
        let body = JSON.stringify(benefProcessOrderDetails);
        return this.httpClient.post(`${this.benefProcessOrderDetailUrl}/save-all/${seqProcessingOrderId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    getBenefProcessOrderDetailByBenfitTypeAndSeqProcessingOrderId(benefitType: any,seqProcessingOrderId:any): Observable<BenefProcessOrderDetail> {
        return this.httpClient.get(`${this.benefProcessOrderDetailUrl}/${benefitType}/${seqProcessingOrderId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefProcessOrderDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


}
