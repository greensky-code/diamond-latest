/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SpecialContractHeader } from '../api-models/special-contract-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SpecialContractHeaderService {

    private specialContractHeaderUrl: string = `${environment.apiUrl}/specialcontractheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSpecialContractHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SpecialContractHeader[]> {
        var url = `${this.specialContractHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractHeader[]),
                catchError(this.sharedService.handleError))
    }

    getSpecialContractHeader(seqSpecCont : number): Observable<SpecialContractHeader> {
        return this.httpClient.get(`${this.specialContractHeaderUrl}/${seqSpecCont}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractHeader),
                catchError(this.sharedService.handleError))
    }

    getSpecialContractHeadersCount(): Observable<number> {
        var url = `${this.specialContractHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<SpecialContractHeader[]> {
        return this.httpClient.get(`${this.specialContractHeaderUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractHeader),
                catchError(this.sharedService.handleError))
    }
    findByPanelId(panelId : string): Observable<SpecialContractHeader[]> {
        return this.httpClient.get(`${this.specialContractHeaderUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractHeader),
                catchError(this.sharedService.handleError))
    }
    findByPriceRule(priceRule : string): Observable<SpecialContractHeader[]> {
        return this.httpClient.get(`${this.specialContractHeaderUrl}/find-by-pricerule/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractHeader),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<SpecialContractHeader[]> {
        return this.httpClient.get(`${this.specialContractHeaderUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractHeader),
                catchError(this.sharedService.handleError))
    }




    createSpecialContractHeader(specialContractHeader : SpecialContractHeader): Observable<any> {
        let body = JSON.stringify(specialContractHeader);
        return this.httpClient.post(this.specialContractHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSpecialContractHeader(specialContractHeader : SpecialContractHeader, seqSpecCont : number): Observable<any> {
        let body = JSON.stringify(specialContractHeader);
        return this.httpClient.put(`${this.specialContractHeaderUrl}/${seqSpecCont}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSpecialContractHeader(specialContractHeader : SpecialContractHeader, seqSpecCont : number): Observable<any> {
        let body = JSON.stringify(specialContractHeader);
        return this.httpClient.patch(`${this.specialContractHeaderUrl}/${seqSpecCont}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSpecialContractHeader(seqSpecCont : number): Observable<any> {
        return this.httpClient.delete(`${this.specialContractHeaderUrl}/${seqSpecCont}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}