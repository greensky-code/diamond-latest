/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {TaxonomyMaster} from "../../api-models/provider/taxonomy-master.model";

@Injectable({
    providedIn: "root"
})
export class TaxonomyMasterService {

    private taxonomyMasterUrl: string = `${environment.apiUrl}/taxonomymasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getTaxonomyMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<TaxonomyMaster[]> {
        var url = `${this.taxonomyMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as TaxonomyMaster[]),
                catchError(this.sharedService.handleError))
    }

    getTaxonomyMaster(code : string): Observable<TaxonomyMaster> {
        return this.httpClient.get(`${this.taxonomyMasterUrl}/${code}`, {observe: 'response'})
            .pipe(map(response => response.body as TaxonomyMaster),
                catchError(this.sharedService.handleError))
    }

    getTaxonomyMastersCount(): Observable<number> {
        var url = `${this.taxonomyMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createTaxonomyMaster(taxonomyMaster : TaxonomyMaster): Observable<any> {
        let body = JSON.stringify(taxonomyMaster);
        return this.httpClient.post(this.taxonomyMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateTaxonomyMaster(taxonomyMaster : TaxonomyMaster, code : string): Observable<any> {
        let body = JSON.stringify(taxonomyMaster);
        return this.httpClient.put(`${this.taxonomyMasterUrl}/${code}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateTaxonomyMaster(taxonomyMaster : TaxonomyMaster, code : string): Observable<any> {
        let body = JSON.stringify(taxonomyMaster);
        return this.httpClient.patch(`${this.taxonomyMasterUrl}/${code}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteTaxonomyMaster(code : string): Observable<any> {
        return this.httpClient.delete(`${this.taxonomyMasterUrl}/${code}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
