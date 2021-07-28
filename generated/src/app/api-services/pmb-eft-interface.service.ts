/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbEftInterface } from '../api-models/pmb-eft-interface.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbEftInterfaceService {

    private pmbEftInterfaceUrl: string = `${environment.apiUrl}/pmbeftinterfaces`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbEftInterfaces(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbEftInterface[]> {
        var url = `${this.pmbEftInterfaceUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbEftInterface[]),
                catchError(this.sharedService.handleError))
    }

    getPmbEftInterface(seqGpbilId : number): Observable<PmbEftInterface> {
        return this.httpClient.get(`${this.pmbEftInterfaceUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbEftInterface),
                catchError(this.sharedService.handleError))
    }

    getPmbEftInterfacesCount(): Observable<number> {
        var url = `${this.pmbEftInterfaceUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbEftInterface(pmbEftInterface : PmbEftInterface): Observable<any> {
        let body = JSON.stringify(pmbEftInterface);
        return this.httpClient.post(this.pmbEftInterfaceUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbEftInterface(pmbEftInterface : PmbEftInterface, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbEftInterface);
        return this.httpClient.put(`${this.pmbEftInterfaceUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbEftInterface(pmbEftInterface : PmbEftInterface, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbEftInterface);
        return this.httpClient.patch(`${this.pmbEftInterfaceUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbEftInterface(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbEftInterfaceUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}