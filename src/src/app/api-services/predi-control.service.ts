/* Copyright (c) 2020 . All Rights Reserved. */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { PrediControl } from '../api-models/predi-control.model';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class PrediControlService {

    private prediControlUrl: string = `${environment.apiUrl}/predicontrol`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    findAllProcessEdiSetups(): Observable<PrediControl[]> {
        return this.httpClient.get(`${this.prediControlUrl}/find-all-predi-controls`, {observe: 'response'})
            .pipe(map(response => response.body as PrediControl),
                catchError(this.sharedService.handleError))

    }
}
