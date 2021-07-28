/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {BenefProcessOrderMaster} from '../api-models/benef-process-order-master.model';
import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BenefProcessOrderMasterService {

    private benefProcessOrderMasterUrl: string = `${environment.apiUrl}/benefprocessordermasters`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefProcessOrderMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefProcessOrderMaster[]> {
        var url = `${this.benefProcessOrderMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefProcessOrderMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefProcessOrderMaster(seqProcessingOrderId: number): Observable<BenefProcessOrderMaster> {
        return this.httpClient.get(`${this.benefProcessOrderMasterUrl}/${seqProcessingOrderId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefProcessOrderMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefProcessOrderMastersCount(): Observable<number> {
        var url = `${this.benefProcessOrderMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createBenefProcessOrderMaster(benefProcessOrderMaster: BenefProcessOrderMaster): Observable<any> {
        let body = JSON.stringify(benefProcessOrderMaster);
        return this.httpClient.post(this.benefProcessOrderMasterUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefProcessOrderMaster(benefProcessOrderMaster: BenefProcessOrderMaster, seqProcessingOrderId: number): Observable<any> {
        let body = JSON.stringify(benefProcessOrderMaster);
        return this.httpClient.put(`${this.benefProcessOrderMasterUrl}/${seqProcessingOrderId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateBenefProcessOrderMaster(benefProcessOrderMaster: BenefProcessOrderMaster, seqProcessingOrderId: number): Observable<any> {
        let body = JSON.stringify(benefProcessOrderMaster);
        return this.httpClient.patch(`${this.benefProcessOrderMasterUrl}/${seqProcessingOrderId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteBenefProcessOrderMaster(seqProcessingOrderId: number): Observable<any> {
        return this.httpClient.delete(`${this.benefProcessOrderMasterUrl}/${seqProcessingOrderId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageMastersOrderByProcessingId(): Observable<BenefProcessOrderMaster[]> {
        var url = `${this.benefProcessOrderMasterUrl}/orderbyprocessingid`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefProcessOrderMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }



}
