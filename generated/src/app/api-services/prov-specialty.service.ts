/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvSpecialty } from '../api-models/prov-specialty.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvSpecialtyService {

    private provSpecialtyUrl: string = `${environment.apiUrl}/provspecialtys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvSpecialtys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvSpecialty[]> {
        var url = `${this.provSpecialtyUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvSpecialty[]),
                catchError(this.sharedService.handleError))
    }

    getProvSpecialty(seqProvId : number): Observable<ProvSpecialty> {
        return this.httpClient.get(`${this.provSpecialtyUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvSpecialty),
                catchError(this.sharedService.handleError))
    }

    getProvSpecialtysCount(): Observable<number> {
        var url = `${this.provSpecialtyUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId : number): Observable<ProvSpecialty[]> {
        return this.httpClient.get(`${this.provSpecialtyUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvSpecialty),
                catchError(this.sharedService.handleError))
    }




    createProvSpecialty(provSpecialty : ProvSpecialty): Observable<any> {
        let body = JSON.stringify(provSpecialty);
        return this.httpClient.post(this.provSpecialtyUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvSpecialty(provSpecialty : ProvSpecialty, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provSpecialty);
        return this.httpClient.put(`${this.provSpecialtyUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvSpecialty(provSpecialty : ProvSpecialty, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provSpecialty);
        return this.httpClient.patch(`${this.provSpecialtyUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvSpecialty(seqProvId : number): Observable<any> {
        return this.httpClient.delete(`${this.provSpecialtyUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}