/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebPricingAccntCodeModel} from "../../api-models/addon/cieb-pricing-accnt-code.model";

@Injectable({
    providedIn: "root"
})
export class CiebPricingAccntCodesService {

    private pricingAccntCodesUrl: string = `${environment.apiUrl}/ciebpricingaccntcodes`;

    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPricingAccntCodes(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebPricingAccntCodeModel[]> {
        var url = `${this.pricingAccntCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPricingAccntCodeModel[]),
                catchError(this.sharedService.handleError))
    }

    findCiebPricingAccntCodesBySeqGroupId(seqGroupId: number): Observable<CiebPricingAccntCodeModel[]> {
        var url = `${this.pricingAccntCodesUrl}/find-by-seq-group-id/${seqGroupId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPricingAccntCodeModel[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPricingAccntCodesBySeqPricingAccntId(seqPricingAccntId: number): Observable<CiebPricingAccntCodeModel> {
        return this.httpClient.get(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPricingAccntCodeModel),
                catchError(this.sharedService.handleError))
    }

    getCiebPricingAccntCodeModelsCount(): Observable<number> {
        var url = `${this.pricingAccntCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebPricingAccntCode(ciebPricingAccntCodeModel: CiebPricingAccntCodeModel): Observable<any> {
        let body = JSON.stringify(ciebPricingAccntCodeModel);
        return this.httpClient.post(this.pricingAccntCodesUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebPricingAccntCode(ciebPricingAccntCodeModel: CiebPricingAccntCodeModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(ciebPricingAccntCodeModel);
        return this.httpClient.put(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPricingAccntCode(ciebPricingAccntCodeModel: CiebPricingAccntCodeModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(ciebPricingAccntCodeModel);
        return this.httpClient.patch(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPricingAccntCode(seqPricingAccntId: number): Observable<any> {
        return this.httpClient.delete(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
