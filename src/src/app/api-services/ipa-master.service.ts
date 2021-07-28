/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {IpaMaster} from '../api-models/ipa-master.model'
import {environment} from '../../environments/environment'
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class IpaMasterService {

    private ipaMasterUrl: string = `${environment.apiUrl}/ipamasters`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<IpaMaster[]> {
        var url = `${this.ipaMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIpaMaster(ipaId: string): Observable<IpaMaster> {
        return this.httpClient.get(`${this.ipaMasterUrl}/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIpaMastersCount(): Observable<number> {
        var url = `${this.ipaMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createIpaMaster(ipaMaster: IpaMaster): Observable<any> {
        let body = JSON.stringify(ipaMaster);
        return this.httpClient.post(this.ipaMasterUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateIpaMaster(ipaMaster: IpaMaster, ipaId: string): Observable<any> {
        let body = JSON.stringify(ipaMaster);
        return this.httpClient.put(`${this.ipaMasterUrl}/${ipaId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateIpaMaster(ipaMaster: IpaMaster, ipaId: string): Observable<any> {
        let body = JSON.stringify(ipaMaster);
        return this.httpClient.patch(`${this.ipaMasterUrl}/${ipaId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteIpaMaster(ipaId: string): Observable<any> {
        return this.httpClient.delete(`${this.ipaMasterUrl}/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
