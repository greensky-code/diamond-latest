/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdCardSetupSelect } from '../api-models/id-card-setup-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdCardSetupSelectService {

    private idCardSetupSelectUrl: string = `${environment.apiUrl}/idcardsetupselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdCardSetupSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdCardSetupSelect[]> {
        var url = `${this.idCardSetupSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdCardSetupSelect[]),
                catchError(this.sharedService.handleError))
    }

    getIdCardSetupSelect(seqIdprtId : number): Observable<IdCardSetupSelect> {
        return this.httpClient.get(`${this.idCardSetupSelectUrl}/${seqIdprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as IdCardSetupSelect),
                catchError(this.sharedService.handleError))
    }

    getIdCardSetupSelectsCount(): Observable<number> {
        var url = `${this.idCardSetupSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createIdCardSetupSelect(idCardSetupSelect : IdCardSetupSelect): Observable<any> {
        let body = JSON.stringify(idCardSetupSelect);
        return this.httpClient.post(this.idCardSetupSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdCardSetupSelect(idCardSetupSelect : IdCardSetupSelect, seqIdprtId : number): Observable<any> {
        let body = JSON.stringify(idCardSetupSelect);
        return this.httpClient.put(`${this.idCardSetupSelectUrl}/${seqIdprtId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdCardSetupSelect(idCardSetupSelect : IdCardSetupSelect, seqIdprtId : number): Observable<any> {
        let body = JSON.stringify(idCardSetupSelect);
        return this.httpClient.patch(`${this.idCardSetupSelectUrl}/${seqIdprtId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdCardSetupSelect(seqIdprtId : number): Observable<any> {
        return this.httpClient.delete(`${this.idCardSetupSelectUrl}/${seqIdprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}