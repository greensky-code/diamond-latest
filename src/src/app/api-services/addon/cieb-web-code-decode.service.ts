/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebWebCodeDecode} from "../../api-models/addon/cieb-web-code-decode.model";

@Injectable({
    providedIn: "root"
})
export class CiebWebCodeDecodeService {

    private ciebWebCodeDecodeUrl: string = `${environment.apiUrl}/ciebwebcodedecodes`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebWebCodeDecodes(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebWebCodeDecode[]> {
        var url = `${this.ciebWebCodeDecodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebWebCodesByCodeAndCodeTypes(code: string, codeType: string): Observable<CiebWebCodeDecode[]> {
        const url = `${this.ciebWebCodeDecodeUrl}/find-by-codeType-code?code=${code}&codeType=${codeType}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode[]),
                catchError(this.sharedService.handleError))
    }

    /**
     * code_type in ('LNK','LNKRC')
     * @param code
     * @param codeType
     */
    getWebCodesInLnkAndLnkrc(): Observable<CiebWebCodeDecode[]> {
        const url = `${this.ciebWebCodeDecodeUrl}/country-dropDown-values`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode[]),
                catchError(this.sharedService.handleError))
    }
    getCiebWebCodesByCodeAndCodeTypeAndDecode1(code: string, codeType: string, decode1: string): Observable<CiebWebCodeDecode[]> {
        const url = `${this.ciebWebCodeDecodeUrl}/find-by-codeType-code-Decode1?code=${code}&codeType=${codeType}&decode1=${decode1}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode[]),
                catchError(this.sharedService.handleError))
    }

    /**
     * @param code
     * @param codeType
     * @param decode3
     */
    getCiebWebCodesByCodeAndCodeTypeAndDecode3(code: string, codeType: string, decode3: string): Observable<CiebWebCodeDecode[]> {
        const url = `${this.ciebWebCodeDecodeUrl}/find-by-codeType-code-Decode3?code=${code}&codeType=${codeType}&decode3=${decode3}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWebCodeDecode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebWebCodeDecode(seqCodeId: number): Observable<CiebWebCodeDecode> {
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


    createCiebWebCodeDecode(ciebWebCodeDecode: CiebWebCodeDecode): Observable<any> {
        let body = JSON.stringify(ciebWebCodeDecode);
        return this.httpClient.post(this.ciebWebCodeDecodeUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebWebCodeDecode(ciebWebCodeDecode: CiebWebCodeDecode, seqCodeId: number): Observable<any> {
        let body = JSON.stringify(ciebWebCodeDecode);
        return this.httpClient.put(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebWebCodeDecode(ciebWebCodeDecode: CiebWebCodeDecode, seqCodeId: number): Observable<any> {
        let body = JSON.stringify(ciebWebCodeDecode);
        return this.httpClient.patch(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebWebCodeDecode(seqCodeId: number): Observable<any> {
        return this.httpClient.delete(`${this.ciebWebCodeDecodeUrl}/${seqCodeId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
