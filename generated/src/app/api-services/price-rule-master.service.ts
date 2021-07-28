/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceRuleMaster } from '../api-models/price-rule-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PriceRuleMasterService {

    private priceRuleMasterUrl: string = `${environment.apiUrl}/pricerulemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPriceRuleMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PriceRuleMaster[]> {
        var url = `${this.priceRuleMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleMaster[]),
                catchError(this.sharedService.handleError))
    }

    getPriceRuleMaster(priceRule : string): Observable<PriceRuleMaster> {
        return this.httpClient.get(`${this.priceRuleMasterUrl}/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleMaster),
                catchError(this.sharedService.handleError))
    }

    getPriceRuleMastersCount(): Observable<number> {
        var url = `${this.priceRuleMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByModifierCode(modifierCode : string): Observable<PriceRuleMaster[]> {
        return this.httpClient.get(`${this.priceRuleMasterUrl}/find-by-modifiercode/${modifierCode}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleMaster),
                catchError(this.sharedService.handleError))
    }




    createPriceRuleMaster(priceRuleMaster : PriceRuleMaster): Observable<any> {
        let body = JSON.stringify(priceRuleMaster);
        return this.httpClient.post(this.priceRuleMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePriceRuleMaster(priceRuleMaster : PriceRuleMaster, priceRule : string): Observable<any> {
        let body = JSON.stringify(priceRuleMaster);
        return this.httpClient.put(`${this.priceRuleMasterUrl}/${priceRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePriceRuleMaster(priceRuleMaster : PriceRuleMaster, priceRule : string): Observable<any> {
        let body = JSON.stringify(priceRuleMaster);
        return this.httpClient.patch(`${this.priceRuleMasterUrl}/${priceRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePriceRuleMaster(priceRule : string): Observable<any> {
        return this.httpClient.delete(`${this.priceRuleMasterUrl}/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}