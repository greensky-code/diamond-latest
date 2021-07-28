/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class CheckCompanyCodeService {

    private checkCompanyCodeUrl: string = `${environment.apiUrl}/sfcheckcompanycode`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }
    
    createCheckCompanyCode(checkCompanyCode: any): Observable<any> {
        let body = JSON.stringify(checkCompanyCode);
        return this.httpClient.post(this.checkCompanyCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
