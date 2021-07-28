/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {CiebEntityCode} from '../../api-models';

@Injectable({
    providedIn: 'root'
})
export class CiebEntityCodeService {

    private ciebEntityCodeUrl: string = `${environment.apiUrl}/ciebentitycodes`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebEntityCodes(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebEntityCode[]> {

        var url = `${this.ciebEntityCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebEntityCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebEntityCode(entityCode: string): Observable<CiebEntityCode> {
        return this.httpClient.get(`${this.ciebEntityCodeUrl}/${entityCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebEntityCode),
                catchError(this.sharedService.handleError))
    }

    getCiebEntityCodesCount(): Observable<number> {
        var url = `${this.ciebEntityCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebEntityCode(ciebEntityCode: CiebEntityCode): Observable<any> {
        let body = JSON.stringify(ciebEntityCode);
        return this.httpClient.post(this.ciebEntityCodeUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebEntityCode(ciebEntityCode: CiebEntityCode, entityCode: string): Observable<any> {
        let body = JSON.stringify(ciebEntityCode);
        return this.httpClient.put(`${this.ciebEntityCodeUrl}/${entityCode}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebEntityCode(ciebEntityCode: CiebEntityCode, entityCode: string): Observable<any> {
        let body = JSON.stringify(ciebEntityCode);
        return this.httpClient.patch(`${this.ciebEntityCodeUrl}/${entityCode}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebEntityCode(entityCode: string): Observable<any> {
        return this.httpClient.delete(`${this.ciebEntityCodeUrl}/${entityCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
