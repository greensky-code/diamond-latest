import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { ClaimHoldDeterminants } from '../api-models/claim-hold-determinants';

@Injectable({
    providedIn: 'root'
})
export class ClaimHoldDeterminantsService {
    private claimHoldDeterminantsUrl: string = `${environment.apiUrl}/claimholddeterminantss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
        private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimHoldDeterminantss(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ClaimHoldDeterminants[]> {
        var url = `${this.claimHoldDeterminantsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as ClaimHoldDeterminants[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClaimHoldDeterminants(seqClhldRule: number): Observable<ClaimHoldDeterminants> {
        return this.httpClient.get(`${this.claimHoldDeterminantsUrl}/${seqClhldRule}`, { observe: 'response' })
            .pipe(map(response => response.body as ClaimHoldDeterminants),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClaimHoldDeterminantssCount(): Observable<number> {
        var url = `${this.claimHoldDeterminantsUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqClhldRule(seqClhldRule: number): Observable<ClaimHoldDeterminants[]> {
        return this.httpClient.get(`${this.claimHoldDeterminantsUrl}/find-by-seqclhldrule/${seqClhldRule}`, { observe: 'response' })
            .pipe(map(response => response.body as ClaimHoldDeterminants),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createClaimHoldDeterminants(claimHoldDeterminants: ClaimHoldDeterminants): Observable<any> {
        let body = JSON.stringify(claimHoldDeterminants);
        return this.httpClient.post(this.claimHoldDeterminantsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateClaimHoldDeterminants(claimHoldDeterminants: ClaimHoldDeterminants, seqClhldRule: number): Observable<any> {
        let body = JSON.stringify(claimHoldDeterminants);
        return this.httpClient.put(`${this.claimHoldDeterminantsUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateClaimHoldDeterminants(claimHoldDeterminants: ClaimHoldDeterminants, seqClhldRule: number): Observable<any> {
        let body = JSON.stringify(claimHoldDeterminants);
        return this.httpClient.patch(`${this.claimHoldDeterminantsUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteClaimHoldDeterminants(seqClhldRule: number, determinantColumnNo: number): Observable<any> {
        return this.httpClient.delete(`${this.claimHoldDeterminantsUrl}/${seqClhldRule}/${determinantColumnNo}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    getSeqClhldRule(seqClhldRule: number): Observable<ClaimHoldDeterminants[]> {
        return this.httpClient.get(`${this.claimHoldDeterminantsUrl}/find-by-seqclaimholdrule/${seqClhldRule}`, { observe: 'response' })
            .pipe(map(response => response.body as ClaimHoldDeterminants),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateClaimHoldDeterminants2(claimHoldDeterminants: ClaimHoldDeterminants, seqClhldRule: number): Observable<any> {
        let body = JSON.stringify(claimHoldDeterminants);
        return this.httpClient.put(`${this.claimHoldDeterminantsUrl}/${claimHoldDeterminants.claimHoldDeterminantsPrimaryKey.determinantColumnNo}/${seqClhldRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
