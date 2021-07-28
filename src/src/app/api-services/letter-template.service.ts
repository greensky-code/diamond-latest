/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { LetterTemplate } from '../api-models/letter-template.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class LetterTemplateService {

    private letterTemplateUrl: string = `${environment.apiUrl}/lettertemplates`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLetterTemplates(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<LetterTemplate[]> {
        var url = `${this.letterTemplateUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as LetterTemplate[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getLetterTemplate(letterId: string): Observable<LetterTemplate> {
        return this.httpClient.get(`${this.letterTemplateUrl}/${letterId}`, { observe: 'response' })
            .pipe(map(response => response.body as LetterTemplate),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getLetterTemplatesCount(): Observable<number> {
        var url = `${this.letterTemplateUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createLetterTemplate(letterTemplate: LetterTemplate): Observable<any> {
        let body = JSON.stringify(letterTemplate);
        return this.httpClient.post(this.letterTemplateUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateLetterTemplate(letterTemplate: LetterTemplate, letterId: string): Observable<any> {
        let body = JSON.stringify(letterTemplate);
        return this.httpClient.put(`${this.letterTemplateUrl}/${letterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateLetterTemplate(letterTemplate: LetterTemplate, letterId: string): Observable<any> {
        let body = JSON.stringify(letterTemplate);
        return this.httpClient.patch(`${this.letterTemplateUrl}/${letterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteLetterTemplate(letterId: string): Observable<any> {
        return this.httpClient.delete(`${this.letterTemplateUrl}/${letterId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
