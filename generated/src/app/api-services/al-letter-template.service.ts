/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLetterTemplate } from '../api-models/al-letter-template.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLetterTemplateService {

    private alLetterTemplateUrl: string = `${environment.apiUrl}/allettertemplates`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLetterTemplates(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLetterTemplate[]> {
        var url = `${this.alLetterTemplateUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterTemplate[]),
                catchError(this.sharedService.handleError))
    }

    getAlLetterTemplate(seqLetterTempId : number): Observable<AlLetterTemplate> {
        return this.httpClient.get(`${this.alLetterTemplateUrl}/${seqLetterTempId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterTemplate),
                catchError(this.sharedService.handleError))
    }

    getAlLetterTemplatesCount(): Observable<number> {
        var url = `${this.alLetterTemplateUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAlLetterTemplate(alLetterTemplate : AlLetterTemplate): Observable<any> {
        let body = JSON.stringify(alLetterTemplate);
        return this.httpClient.post(this.alLetterTemplateUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLetterTemplate(alLetterTemplate : AlLetterTemplate, seqLetterTempId : number): Observable<any> {
        let body = JSON.stringify(alLetterTemplate);
        return this.httpClient.put(`${this.alLetterTemplateUrl}/${seqLetterTempId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLetterTemplate(alLetterTemplate : AlLetterTemplate, seqLetterTempId : number): Observable<any> {
        let body = JSON.stringify(alLetterTemplate);
        return this.httpClient.patch(`${this.alLetterTemplateUrl}/${seqLetterTempId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLetterTemplate(seqLetterTempId : number): Observable<any> {
        return this.httpClient.delete(`${this.alLetterTemplateUrl}/${seqLetterTempId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}