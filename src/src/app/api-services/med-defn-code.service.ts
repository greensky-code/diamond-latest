/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MedDefnCode } from '../api-models/med-defn-code.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MedDefnCodeService {

    private medDefnCodeUrl: string = `${environment.apiUrl}/meddefncodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnCodes(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MedDefnCode[]> {
        var url = `${this.medDefnCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as MedDefnCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMedDefnCode(medDefCode: string): Observable<MedDefnCode> {
        return this.httpClient.get(`${this.medDefnCodeUrl}/${medDefCode}`, { observe: 'response' })
            .pipe(map(response => response.body as MedDefnCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMedDefnCodesCount(): Observable<number> {
        var url = `${this.medDefnCodeUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createMedDefnCode(medDefnCode: MedDefnCode): Observable<any> {
        let body = JSON.stringify(medDefnCode);
        return this.httpClient.post(this.medDefnCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMedDefnCode(medDefnCode: MedDefnCode, medDefCode: string): Observable<any> {
        let body = JSON.stringify(medDefnCode);
        return this.httpClient.put(`${this.medDefnCodeUrl}/${medDefCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMedDefnCode(medDefnCode: MedDefnCode, medDefCode: string): Observable<any> {
        let body = JSON.stringify(medDefnCode);
        return this.httpClient.patch(`${this.medDefnCodeUrl}/${medDefCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMedDefnCode(medDefCode: string): Observable<any> {
        return this.httpClient.delete(`${this.medDefnCodeUrl}/${medDefCode}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
