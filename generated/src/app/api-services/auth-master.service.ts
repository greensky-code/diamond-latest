/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthMaster } from '../api-models/auth-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthMasterService {

    private authMasterUrl: string = `${environment.apiUrl}/authmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthMaster[]> {
        var url = `${this.authMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster[]),
                catchError(this.sharedService.handleError))
    }

    getAuthMaster(authNumber : number): Observable<AuthMaster> {
        return this.httpClient.get(`${this.authMasterUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }

    getAuthMastersCount(): Observable<number> {
        var url = `${this.authMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByPlaceOfService(placeOfService : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-placeofservice/${placeOfService}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByMedDefCode(medDefCode : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-meddefcode/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqGroupId(seqGroupId : number): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqMembId(seqMembId : number): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySurgProcedure6(surgProcedure6 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure6/${surgProcedure6}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySurgProcedure3(surgProcedure3 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure3/${surgProcedure3}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySurgProcedure2(surgProcedure2 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure2/${surgProcedure2}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByServiceReason(serviceReason : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-servicereason/${serviceReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByServiceAdmitType(serviceAdmitType : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-serviceadmittype/${serviceAdmitType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByReviewType(reviewType : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-reviewtype/${reviewType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByPlanCode(planCode : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-plancode/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByOutcome(outcome : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-outcome/${outcome}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason(holdReason : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDisposition(disposition : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-disposition/${disposition}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis9(diagnosis9 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis9/${diagnosis9}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis8(diagnosis8 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis8/${diagnosis8}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis7(diagnosis7 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis7/${diagnosis7}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis5(diagnosis5 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis5/${diagnosis5}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis4(diagnosis4 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis4/${diagnosis4}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis3(diagnosis3 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis3/${diagnosis3}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis1(diagnosis1 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis1/${diagnosis1}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDeniedReason(deniedReason : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-deniedreason/${deniedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByClosedReason(closedReason : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-closedreason/${closedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySurgProcedure5(surgProcedure5 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure5/${surgProcedure5}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySurgProcedure4(surgProcedure4 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure4/${surgProcedure4}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findBySurgProcedure1(surgProcedure1 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure1/${surgProcedure1}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByImpact(impact : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-impact/${impact}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDischargeDiagnosis(dischargeDiagnosis : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-dischargediagnosis/${dischargeDiagnosis}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis6(diagnosis6 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis6/${diagnosis6}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByDiagnosis2(diagnosis2 : string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis2/${diagnosis2}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }




    createAuthMaster(authMaster : AuthMaster): Observable<any> {
        let body = JSON.stringify(authMaster);
        return this.httpClient.post(this.authMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthMaster(authMaster : AuthMaster, authNumber : number): Observable<any> {
        let body = JSON.stringify(authMaster);
        return this.httpClient.put(`${this.authMasterUrl}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthMaster(authMaster : AuthMaster, authNumber : number): Observable<any> {
        let body = JSON.stringify(authMaster);
        return this.httpClient.patch(`${this.authMasterUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthMaster(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authMasterUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}