/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebPhone} from "../../api-models/addon/cieb-phone.model";

@Injectable({
    providedIn: "root"
})
export class CiebPhoneService {

    private ciebPhoneUrl: string = `${environment.apiUrl}/ciebphones`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPhones(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebPhone[]> {
        var url = `${this.ciebPhoneUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPhone[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPhone(seqPhoneId : number): Observable<CiebPhone> {
        return this.httpClient.get(`${this.ciebPhoneUrl}/${seqPhoneId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPhone),
                catchError(this.sharedService.handleError))
    }

    getCiebPhoneBySeqEntityId(seqEntityId : number): Observable<CiebPhone[]> {
        return this.httpClient.get(`${this.ciebPhoneUrl}/find-by-seq-entity-id/${seqEntityId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPhone[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPhonesCount(): Observable<number> {
        var url = `${this.ciebPhoneUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebPhone(ciebPhone : CiebPhone): Observable<any> {
        let body = JSON.stringify(ciebPhone);
        return this.httpClient.post(this.ciebPhoneUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebPhone(ciebPhone : CiebPhone, seqPhoneId : number): Observable<any> {
        let body = JSON.stringify(ciebPhone);
        return this.httpClient.put(`${this.ciebPhoneUrl}/${seqPhoneId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPhone(ciebPhone : CiebPhone, seqPhoneId : number): Observable<any> {
        let body = JSON.stringify(ciebPhone);
        return this.httpClient.patch(`${this.ciebPhoneUrl}/${seqPhoneId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPhone(seqPhoneId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebPhoneUrl}/${seqPhoneId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
