/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthWaiveRules } from '../api-models/auth-waive-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { AuthWaiveSP } from '../api-models/auth-wave-sp.model';

@Injectable()
export class AuthWaiveSPService {
    private authWaiveRulesUrl: string = `${environment.apiUrl}/spsetalvlclaimhdrbrkr`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    spSetAlvlClaimHdrBrkr(authWaiveParams : AuthWaiveSP): Observable<any> {
        let body = JSON.stringify(authWaiveParams);
        return this.httpClient.post(this.authWaiveRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }
}