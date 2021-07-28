/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import { CiebContactModel } from '../../api-models/addon/cieb-contacts.model';

@Injectable({
    providedIn: "root"
})
export class CiebContactService {

    private pricingAccntCodesUrl: string = `${environment.apiUrl}/ciebcontacts`;

    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPricingAccntCodes(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebContactModel[]> {
        var url = `${this.pricingAccntCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactModel[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPricingAccntCodesBySeqPricingAccntId(seqPricingAccntId: number): Observable<CiebContactModel> {
        return this.httpClient.get(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactModel),
                catchError(this.sharedService.handleError))
    }

    getCiebContactModelsCount(): Observable<number> {
        var url = `${this.pricingAccntCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebPricingAccntCode(CiebContactModel: CiebContactModel): Observable<any> {
        let body = JSON.stringify(CiebContactModel);
        return this.httpClient.post(this.pricingAccntCodesUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebPricingAccntCode(CiebContactModel: CiebContactModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(CiebContactModel);
        return this.httpClient.put(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPricingAccntCode(CiebContactModel: CiebContactModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(CiebContactModel);
        return this.httpClient.patch(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPricingAccntCode(seqPricingAccntId: number): Observable<any> {
        return this.httpClient.delete(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }

    getCiebContactBySeqEntityId(seqEntityId: number ): Observable<CiebContactModel[]> {
        var url = `${this.pricingAccntCodesUrl}/searchBySeqEntityId/${seqEntityId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactModel[]),
                catchError(this.sharedService.handleError))
    }
}
