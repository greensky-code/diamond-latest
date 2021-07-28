/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {PriceRuleMaster} from '../api-models/price-rule-master.model'
import {environment} from '../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PriceRuleMasterService {

    private priceRuleMasterUrl: string = `${environment.apiUrl}/pricerulemasters`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPriceRuleMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<PriceRuleMaster[]> {
        var url = `${this.priceRuleMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
        .pipe(map(response => response.body as PriceRuleMaster[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPriceRuleMaster(priceRule: string): Observable<PriceRuleMaster> {
        return this.httpClient.get(`${this.priceRuleMasterUrl}/${priceRule}`, {observe: 'response'})
        .pipe(map(response => response.body as PriceRuleMaster),
        catchError(this.sharedService.handleError
                 ))
    }

    getPriceRuleMastersCount(): Observable<number> {
        var url = `${this.priceRuleMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
        .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByModifierCode(modifierCode: string): Observable<PriceRuleMaster[]> {
        return this.httpClient.get(`${this.priceRuleMasterUrl}/find-by-modifiercode/${modifierCode}`, {observe: 'response'})
        .pipe(map(response => response.body as PriceRuleMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createPriceRuleMaster(priceRuleMaster: PriceRuleMaster): Observable<any> {
        let body = JSON.stringify(priceRuleMaster);
        return this.httpClient.post(this.priceRuleMasterUrl, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePriceRuleMaster(priceRuleMaster: PriceRuleMaster, priceRule: string): Observable<any> {
        let body = JSON.stringify(priceRuleMaster);
        return this.httpClient.put(`${this.priceRuleMasterUrl}/${priceRule}`, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePriceRuleMaster(priceRuleMaster: PriceRuleMaster, priceRule: string): Observable<any> {
        let body = JSON.stringify(priceRuleMaster);
        return this.httpClient.patch(`${this.priceRuleMasterUrl}/${priceRule}`, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePriceRuleMaster(priceRule: string): Observable<any> {
        return this.httpClient.delete(`${this.priceRuleMasterUrl}/${priceRule}`, {observe: 'response'})
        .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
