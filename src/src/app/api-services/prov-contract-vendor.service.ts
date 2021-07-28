/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ProvContractVendor } from '../api-models/prov-contract-vendor.model'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProvContractVendorService {

    private provContractVendorUrl: string = `${environment.apiUrl}/provcontractvendors`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractVendors(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ProvContractVendor[]> {
        var url = `${this.provContractVendorUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as ProvContractVendor[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractVendor(seqProvVendId: number): Observable<ProvContractVendor> {
        return this.httpClient.get(`${this.provContractVendorUrl}/${seqProvVendId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvContractVendor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractVendorsCount(): Observable<number> {
        var url = `${this.provContractVendorUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvContract(seqProvContract: number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqprovcontract/${seqProvContract}`, { observe: 'response' })
            .pipe(map(response => response.body ),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvId(seqProvId: number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqprovid/${seqProvId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvContractVendor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqVendAddress(seqVendAddress: number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqvendaddress/${seqVendAddress}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvContractVendor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqVendId(seqVendId: number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqvendid/${seqVendId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvContractVendor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createProvContractVendor(provContractVendor: ProvContractVendor): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.post(this.provContractVendorUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     * update list of records based on action, add/update/delete
     * @param provContractVendor[]
     */

    updateProvContractVendorRecords(provContractVendor: ProvContractVendor[]): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.post(`${this.provContractVendorUrl}/updateProvContractVendorRecords`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvContractVendor(provContractVendor: ProvContractVendor, seqProvVendId: number): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.put(`${this.provContractVendorUrl}/${provContractVendor.provContractVendorPrimaryKey.seqProvContract}/${provContractVendor.provContractVendorPrimaryKey.seqProvId}/${seqProvVendId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvContractVendor(provContractVendor: ProvContractVendor, seqProvVendId: number): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.patch(`${this.provContractVendorUrl}/${seqProvVendId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvContractVendor(seqProvVendId: number): Observable<any> {
        return this.httpClient.delete(`${this.provContractVendorUrl}/${seqProvVendId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    findBySeqVendorId(seqVendId: number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqvendorid/${seqVendId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvContractVendor),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvContractAndSeqProvVendId(seqProvContract: any, seqProvVendId: any) {
        return this.httpClient.get(`${this.provContractVendorUrl}/provider/details/${seqProvVendId}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    findClaimTypesBySeqVendIdAndSeqVendAddressAndSeqVendContract(seqVendId: string, seqVendAddress: string, seqProvContract: any) {
        return this.httpClient.get(`${this.provContractVendorUrl}/claim/type/${seqVendId}/${seqVendAddress}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    findProvContractOrdersByDetails(DET_SRCH_SEQUENCE: any, DET_SRCH_ORDER: any, seqVendAddrss: any, seqVendId: any, seqProvContract: any, CLAIM_TYPE: any) {
        return this.httpClient.get(`${this.provContractVendorUrl}/order/${DET_SRCH_SEQUENCE}/${DET_SRCH_ORDER}/${seqVendAddrss}/${seqVendId}/${seqProvContract}/${CLAIM_TYPE}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    findPriceSchedOrderDetails(DET_SRCH_SEQUENCE: any, DET_SRCH_ORDER: any, seqVendAddrss: any, seqVendId: any, seqProvContract: any, CLAIM_TYPE: any){
        return this.httpClient.get(`${this.provContractVendorUrl}/orderPriceSched/${DET_SRCH_SEQUENCE}/${DET_SRCH_ORDER}/${seqVendAddrss}/${seqVendId}/${seqProvContract}/${CLAIM_TYPE}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }






}
