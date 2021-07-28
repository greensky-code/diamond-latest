/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdCardOrder } from '../api-models/id-card-order.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdCardOrderService {

    private idCardOrderUrl: string = `${environment.apiUrl}/idcardorders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdCardOrders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdCardOrder[]> {
        var url = `${this.idCardOrderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdCardOrder[]),
                catchError(this.sharedService.handleError))
    }

    getIdCardOrder(seqIdCardOrder : number): Observable<IdCardOrder> {
        return this.httpClient.get(`${this.idCardOrderUrl}/${seqIdCardOrder}`, {observe: 'response'})
            .pipe(map(response => response.body as IdCardOrder),
                catchError(this.sharedService.handleError))
    }

    getIdCardOrdersCount(): Observable<number> {
        var url = `${this.idCardOrderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqMembId(seqMembId : number): Observable<IdCardOrder[]> {
        return this.httpClient.get(`${this.idCardOrderUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as IdCardOrder),
                catchError(this.sharedService.handleError))
    }




    createIdCardOrder(idCardOrder : IdCardOrder): Observable<any> {
        let body = JSON.stringify(idCardOrder);
        return this.httpClient.post(this.idCardOrderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdCardOrder(idCardOrder : IdCardOrder, seqIdCardOrder : number): Observable<any> {
        let body = JSON.stringify(idCardOrder);
        return this.httpClient.put(`${this.idCardOrderUrl}/${seqIdCardOrder}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdCardOrder(idCardOrder : IdCardOrder, seqIdCardOrder : number): Observable<any> {
        let body = JSON.stringify(idCardOrder);
        return this.httpClient.patch(`${this.idCardOrderUrl}/${seqIdCardOrder}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdCardOrder(seqIdCardOrder : number): Observable<any> {
        return this.httpClient.delete(`${this.idCardOrderUrl}/${seqIdCardOrder}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}