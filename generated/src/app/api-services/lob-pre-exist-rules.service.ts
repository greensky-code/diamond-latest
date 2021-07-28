/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LobPreExistRules } from '../api-models/lob-pre-exist-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LobPreExistRulesService {

    private lobPreExistRulesUrl: string = `${environment.apiUrl}/lobpreexistruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLobPreExistRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LobPreExistRules[]> {
        var url = `${this.lobPreExistRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LobPreExistRules[]),
                catchError(this.sharedService.handleError))
    }

    getLobPreExistRules(seqLbpecId : number): Observable<LobPreExistRules> {
        return this.httpClient.get(`${this.lobPreExistRulesUrl}/${seqLbpecId}`, {observe: 'response'})
            .pipe(map(response => response.body as LobPreExistRules),
                catchError(this.sharedService.handleError))
    }

    getLobPreExistRulesesCount(): Observable<number> {
        var url = `${this.lobPreExistRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<LobPreExistRules[]> {
        return this.httpClient.get(`${this.lobPreExistRulesUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as LobPreExistRules),
                catchError(this.sharedService.handleError))
    }




    createLobPreExistRules(lobPreExistRules : LobPreExistRules): Observable<any> {
        let body = JSON.stringify(lobPreExistRules);
        return this.httpClient.post(this.lobPreExistRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLobPreExistRules(lobPreExistRules : LobPreExistRules, seqLbpecId : number): Observable<any> {
        let body = JSON.stringify(lobPreExistRules);
        return this.httpClient.put(`${this.lobPreExistRulesUrl}/${seqLbpecId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLobPreExistRules(lobPreExistRules : LobPreExistRules, seqLbpecId : number): Observable<any> {
        let body = JSON.stringify(lobPreExistRules);
        return this.httpClient.patch(`${this.lobPreExistRulesUrl}/${seqLbpecId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLobPreExistRules(seqLbpecId : number): Observable<any> {
        return this.httpClient.delete(`${this.lobPreExistRulesUrl}/${seqLbpecId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}