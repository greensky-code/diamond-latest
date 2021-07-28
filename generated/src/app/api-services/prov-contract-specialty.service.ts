/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractSpecialty } from '../api-models/prov-contract-specialty.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractSpecialtyService {

    private provContractSpecialtyUrl: string = `${environment.apiUrl}/provcontractspecialtys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractSpecialtys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractSpecialty[]> {
        var url = `${this.provContractSpecialtyUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractSpecialty[]),
                catchError(this.sharedService.handleError))
    }

    getProvContractSpecialty(seqProvId : number): Observable<ProvContractSpecialty> {
        return this.httpClient.get(`${this.provContractSpecialtyUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractSpecialty),
                catchError(this.sharedService.handleError))
    }

    getProvContractSpecialtysCount(): Observable<number> {
        var url = `${this.provContractSpecialtyUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId : number): Observable<ProvContractSpecialty[]> {
        return this.httpClient.get(`${this.provContractSpecialtyUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractSpecialty),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvContract(seqProvContract : number): Observable<ProvContractSpecialty[]> {
        return this.httpClient.get(`${this.provContractSpecialtyUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractSpecialty),
                catchError(this.sharedService.handleError))
    }




    createProvContractSpecialty(provContractSpecialty : ProvContractSpecialty): Observable<any> {
        let body = JSON.stringify(provContractSpecialty);
        return this.httpClient.post(this.provContractSpecialtyUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvContractSpecialty(provContractSpecialty : ProvContractSpecialty, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provContractSpecialty);
        return this.httpClient.put(`${this.provContractSpecialtyUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvContractSpecialty(provContractSpecialty : ProvContractSpecialty, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provContractSpecialty);
        return this.httpClient.patch(`${this.provContractSpecialtyUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvContractSpecialty(seqProvId : number): Observable<any> {
        return this.httpClient.delete(`${this.provContractSpecialtyUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}