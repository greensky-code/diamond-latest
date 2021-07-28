/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Country } from '../api-models/country.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CountryService {

    private countryUrl: string = `${environment.apiUrl}/countrys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCountrys(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<Country[]> {
        var url = `${this.countryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as Country[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCountrysDropdowns(): Observable<Country[]> {
        var url = `${this.countryUrl}/dropdown`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as Country[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCountry(countryCode: string): Observable<Country> {
        return this.httpClient.get(`${this.countryUrl}/${countryCode}`, { observe: 'response' })
            .pipe(map(response => response.body as Country),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCountrysCount(): Observable<number> {
        var url = `${this.countryUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createCountry(country: Country): Observable<any> {
        let body = JSON.stringify(country);
        return this.httpClient.post(this.countryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCountry(country: Country, countryCode: string): Observable<any> {
        let body = JSON.stringify(country);
        return this.httpClient.put(`${this.countryUrl}/${countryCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCountry(country: Country, countryCode: string): Observable<any> {
        let body = JSON.stringify(country);
        return this.httpClient.patch(`${this.countryUrl}/${countryCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCountry(countryCode: string): Observable<any> {
        return this.httpClient.delete(`${this.countryUrl}/${countryCode}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
