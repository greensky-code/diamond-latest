/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LetterTemplateField } from '../api-models/letter-template-field.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LetterTemplateFieldService {

    private letterTemplateFieldUrl: string = `${environment.apiUrl}/lettertemplatefields`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLetterTemplateFields(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LetterTemplateField[]> {
        var url = `${this.letterTemplateFieldUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LetterTemplateField[]),
                catchError(this.sharedService.handleError))
    }

    getLetterTemplateField(letterId : string): Observable<LetterTemplateField> {
        return this.httpClient.get(`${this.letterTemplateFieldUrl}/${letterId}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterTemplateField),
                catchError(this.sharedService.handleError))
    }

    getLetterTemplateFieldsCount(): Observable<number> {
        var url = `${this.letterTemplateFieldUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createLetterTemplateField(letterTemplateField : LetterTemplateField): Observable<any> {
        let body = JSON.stringify(letterTemplateField);
        return this.httpClient.post(this.letterTemplateFieldUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLetterTemplateField(letterTemplateField : LetterTemplateField, letterId : string): Observable<any> {
        let body = JSON.stringify(letterTemplateField);
        return this.httpClient.put(`${this.letterTemplateFieldUrl}/${letterId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLetterTemplateField(letterTemplateField : LetterTemplateField, letterId : string): Observable<any> {
        let body = JSON.stringify(letterTemplateField);
        return this.httpClient.patch(`${this.letterTemplateFieldUrl}/${letterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLetterTemplateField(letterId : string): Observable<any> {
        return this.httpClient.delete(`${this.letterTemplateFieldUrl}/${letterId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}