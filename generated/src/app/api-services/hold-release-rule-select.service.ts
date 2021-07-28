/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HoldReleaseRuleSelect } from '../api-models/hold-release-rule-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HoldReleaseRuleSelectService {

    private holdReleaseRuleSelectUrl: string = `${environment.apiUrl}/holdreleaseruleselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getHoldReleaseRuleSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<HoldReleaseRuleSelect[]> {
        var url = `${this.holdReleaseRuleSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as HoldReleaseRuleSelect[]),
                catchError(this.sharedService.handleError))
    }

    getHoldReleaseRuleSelect(seqRuleId : number): Observable<HoldReleaseRuleSelect> {
        return this.httpClient.get(`${this.holdReleaseRuleSelectUrl}/${seqRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body as HoldReleaseRuleSelect),
                catchError(this.sharedService.handleError))
    }

    getHoldReleaseRuleSelectsCount(): Observable<number> {
        var url = `${this.holdReleaseRuleSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createHoldReleaseRuleSelect(holdReleaseRuleSelect : HoldReleaseRuleSelect): Observable<any> {
        let body = JSON.stringify(holdReleaseRuleSelect);
        return this.httpClient.post(this.holdReleaseRuleSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateHoldReleaseRuleSelect(holdReleaseRuleSelect : HoldReleaseRuleSelect, seqRuleId : number): Observable<any> {
        let body = JSON.stringify(holdReleaseRuleSelect);
        return this.httpClient.put(`${this.holdReleaseRuleSelectUrl}/${seqRuleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateHoldReleaseRuleSelect(holdReleaseRuleSelect : HoldReleaseRuleSelect, seqRuleId : number): Observable<any> {
        let body = JSON.stringify(holdReleaseRuleSelect);
        return this.httpClient.patch(`${this.holdReleaseRuleSelectUrl}/${seqRuleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteHoldReleaseRuleSelect(seqRuleId : number): Observable<any> {
        return this.httpClient.delete(`${this.holdReleaseRuleSelectUrl}/${seqRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}