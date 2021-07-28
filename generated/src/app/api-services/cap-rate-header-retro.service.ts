/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapRateHeaderRetro } from '../api-models/cap-rate-header-retro.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapRateHeaderRetroService {

    private capRateHeaderRetroUrl: string = `${environment.apiUrl}/caprateheaderretroes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapRateHeaderRetroes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapRateHeaderRetro[]> {
        var url = `${this.capRateHeaderRetroUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapRateHeaderRetro[]),
                catchError(this.sharedService.handleError))
    }

    getCapRateHeaderRetro(seqCapRateHdr : number): Observable<CapRateHeaderRetro> {
        return this.httpClient.get(`${this.capRateHeaderRetroUrl}/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body as CapRateHeaderRetro),
                catchError(this.sharedService.handleError))
    }

    getCapRateHeaderRetroesCount(): Observable<number> {
        var url = `${this.capRateHeaderRetroUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapRateHeaderRetro(capRateHeaderRetro : CapRateHeaderRetro): Observable<any> {
        let body = JSON.stringify(capRateHeaderRetro);
        return this.httpClient.post(this.capRateHeaderRetroUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapRateHeaderRetro(capRateHeaderRetro : CapRateHeaderRetro, seqCapRateHdr : number): Observable<any> {
        let body = JSON.stringify(capRateHeaderRetro);
        return this.httpClient.put(`${this.capRateHeaderRetroUrl}/${seqCapRateHdr}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapRateHeaderRetro(capRateHeaderRetro : CapRateHeaderRetro, seqCapRateHdr : number): Observable<any> {
        let body = JSON.stringify(capRateHeaderRetro);
        return this.httpClient.patch(`${this.capRateHeaderRetroUrl}/${seqCapRateHdr}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapRateHeaderRetro(seqCapRateHdr : number): Observable<any> {
        return this.httpClient.delete(`${this.capRateHeaderRetroUrl}/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}