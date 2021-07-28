/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractTaxonomy } from '../api-models/prov-contract-taxonomy.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProvContractTaxonomyService {

    private provContractTaxonomyUrl: string = `${environment.apiUrl}/provcontracttaxonomys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractTaxonomys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractTaxonomy[]> {
        var url = `${this.provContractTaxonomyUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractTaxonomy[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractTaxonomy(seqProvId : number): Observable<ProvContractTaxonomy> {
        return this.httpClient.get(`${this.provContractTaxonomyUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractTaxonomy),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractTaxonomysCount(): Observable<number> {
        var url = `${this.provContractTaxonomyUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByTaxonomyCode(taxonomyCode : string): Observable<ProvContractTaxonomy[]> {
        return this.httpClient.get(`${this.provContractTaxonomyUrl}/find-by-taxonomycode/${taxonomyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractTaxonomy),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvId(seqProvId : number): Observable<ProvContractTaxonomy[]> {
        return this.httpClient.get(`${this.provContractTaxonomyUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractTaxonomy),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvContract(seqProvContract : number): Observable<ProvContractTaxonomy[]> {
        return this.httpClient.get(`${this.provContractTaxonomyUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractTaxonomy),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createProvContractTaxonomy(provContractTaxonomy : ProvContractTaxonomy): Observable<any> {
        let body = JSON.stringify(provContractTaxonomy);
        return this.httpClient.post(this.provContractTaxonomyUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvContractTaxonomy(provContractTaxonomy : ProvContractTaxonomy, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provContractTaxonomy);
        return this.httpClient.put(`${this.provContractTaxonomyUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvContractTaxonomy(provContractTaxonomy : ProvContractTaxonomy, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provContractTaxonomy);
        return this.httpClient.patch(`${this.provContractTaxonomyUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvContractTaxonomy(seqProvId : number): Observable<any> {
        return this.httpClient.delete(`${this.provContractTaxonomyUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
