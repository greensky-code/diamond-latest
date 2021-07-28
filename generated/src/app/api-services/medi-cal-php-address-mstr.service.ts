/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MediCalPhpAddressMstr } from '../api-models/medi-cal-php-address-mstr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MediCalPhpAddressMstrService {

    private mediCalPhpAddressMstrUrl: string = `${environment.apiUrl}/medicalphpaddressmstrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMediCalPhpAddressMstrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MediCalPhpAddressMstr[]> {
        var url = `${this.mediCalPhpAddressMstrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MediCalPhpAddressMstr[]),
                catchError(this.sharedService.handleError))
    }

    getMediCalPhpAddressMstr(seqPhpAddressId : number): Observable<MediCalPhpAddressMstr> {
        return this.httpClient.get(`${this.mediCalPhpAddressMstrUrl}/${seqPhpAddressId}`, {observe: 'response'})
            .pipe(map(response => response.body as MediCalPhpAddressMstr),
                catchError(this.sharedService.handleError))
    }

    getMediCalPhpAddressMstrsCount(): Observable<number> {
        var url = `${this.mediCalPhpAddressMstrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMediCalPhpAddressMstr(mediCalPhpAddressMstr : MediCalPhpAddressMstr): Observable<any> {
        let body = JSON.stringify(mediCalPhpAddressMstr);
        return this.httpClient.post(this.mediCalPhpAddressMstrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMediCalPhpAddressMstr(mediCalPhpAddressMstr : MediCalPhpAddressMstr, seqPhpAddressId : number): Observable<any> {
        let body = JSON.stringify(mediCalPhpAddressMstr);
        return this.httpClient.put(`${this.mediCalPhpAddressMstrUrl}/${seqPhpAddressId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMediCalPhpAddressMstr(mediCalPhpAddressMstr : MediCalPhpAddressMstr, seqPhpAddressId : number): Observable<any> {
        let body = JSON.stringify(mediCalPhpAddressMstr);
        return this.httpClient.patch(`${this.mediCalPhpAddressMstrUrl}/${seqPhpAddressId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMediCalPhpAddressMstr(seqPhpAddressId : number): Observable<any> {
        return this.httpClient.delete(`${this.mediCalPhpAddressMstrUrl}/${seqPhpAddressId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}