/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebWebCodeDecode } from '../api-models/cieb-web-code-decode.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebWebCodeDecodeService {

    private ciebWebCodeDecodeUrl: string = `${environment.apiUrl}/ciebwebcodedecodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebWebCodeDecodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebWebCodeDecode[]> {
        var url = `${this.ciebWebCodeDecodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebWebCodeDecode(seqCodeId : number): Observable<CiebWebCodeDecode> {
        return this.httpClient.get(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode),
                catchError(this.sharedService.handleError))
    }

    getCiebWebCodeDecodesCount(): Observable<number> {
        var url = `${this.ciebWebCodeDecodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebWebCodeDecode(ciebWebCodeDecode : CiebWebCodeDecode): Observable<any> {
        let body = JSON.stringify(ciebWebCodeDecode);
        return this.httpClient.post(this.ciebWebCodeDecodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebWebCodeDecode(ciebWebCodeDecode : CiebWebCodeDecode, seqCodeId : number): Observable<any> {
        let body = JSON.stringify(ciebWebCodeDecode);
        return this.httpClient.put(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebWebCodeDecode(ciebWebCodeDecode : CiebWebCodeDecode, seqCodeId : number): Observable<any> {
        let body = JSON.stringify(ciebWebCodeDecode);
        return this.httpClient.patch(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebWebCodeDecode(seqCodeId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}