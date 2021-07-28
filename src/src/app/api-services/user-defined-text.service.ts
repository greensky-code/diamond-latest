/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserDefinedText } from '../api-models/user-defined-text.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserDefinedTextService {

    private userDefinedTextUrl: string = `${environment.apiUrl}/userdefinedtexts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserDefinedTexts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<UserDefinedText[]> {
        var url = `${this.userDefinedTextUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedText[]),
                catchError(this.sharedService.handleError))
    }

    getUserDefinedText(winId : string): Observable<UserDefinedText> {
        return this.httpClient.get(`${this.userDefinedTextUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedText),
                catchError(this.sharedService.handleError))
    }

    getUserDefinedTextsCount(): Observable<number> {
        var url = `${this.userDefinedTextUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createUserDefinedText(userDefinedText : UserDefinedText): Observable<any> {
        let body = JSON.stringify(userDefinedText);
        return this.httpClient.post(this.userDefinedTextUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateUserDefinedText(userDefinedText : UserDefinedText): Observable<any> {
       let body = JSON.stringify(userDefinedText);
        return this.httpClient.put(`${this.userDefinedTextUrl}/${userDefinedText.languageId}/${userDefinedText.userDefineTextName}/${userDefinedText.datawindowId}/${userDefinedText.winId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateUserDefinedText(userDefinedText : UserDefinedText, winId : string): Observable<any> {
        let body = JSON.stringify(userDefinedText);
        return this.httpClient.patch(`${this.userDefinedTextUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteUserDefinedText(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.userDefinedTextUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }


    getUserDefinedTextFields(datawindowId:string,winId : string): Observable<UserDefinedText[]> {
        return this.httpClient.get(`${this.userDefinedTextUrl}/${datawindowId}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedText[]),
                catchError(this.sharedService.handleError))
    }

}