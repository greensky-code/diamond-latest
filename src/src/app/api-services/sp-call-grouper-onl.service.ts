/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';
import { SpCallGrouperOnlModel } from '../api-models/sp-call-grouper-onl.model';

@Injectable()
export class SpCallGrouperOnlService {

    private spcallgrouperonlURL: string = `${environment.apiUrl}/spcallgrouperonl`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,  private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    spCallGrouperOnl(data:SpCallGrouperOnlModel):Observable<any> {
        let body = JSON.stringify(data);
        return this.httpClient.post(this.spcallgrouperonlURL, body,
            {
                headers: this.contentHeaders
            }).pipe(map(response => response),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}