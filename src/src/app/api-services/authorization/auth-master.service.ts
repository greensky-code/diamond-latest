/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment'
import {SharedService} from '../../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';
import {AuthMaster} from '../../api-models/authorization/auth-master.model';
import {ProvMaster} from '../../api-models/prov-master.model'
import { CONFIG } from '../../core/config';

@Injectable({
    providedIn: 'root'
})
export class AuthMasterService {

    private authMasterUrl = `${environment.apiUrl}/authmasters`;
    private authProviderUrl = `${environment.apiUrl}/authproviders`
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthMasters(usePagination = false, page = 0, size = 0): Observable<AuthMaster[]> {
        const url = `${this.authMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthMaster(authNumber: any): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-authNo/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthMastersCount(): Observable<number> {
        var url = `${this.authMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPlaceOfService(placeOfService: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-placeofservice/${placeOfService}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByMedDefCode(medDefCode: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-meddefcode/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqGroupId(seqGroupId: number): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqMembId(seqMembId: number): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySurgProcedure6(surgProcedure6: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure6/${surgProcedure6}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySurgProcedure3(surgProcedure3: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure3/${surgProcedure3}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySurgProcedure2(surgProcedure2: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure2/${surgProcedure2}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByServiceReason(serviceReason: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-servicereason/${serviceReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByServiceAdmitType(serviceAdmitType: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-serviceadmittype/${serviceAdmitType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByReviewType(reviewType: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-reviewtype/${reviewType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPlanCode(planCode: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-plancode/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByOutcome(outcome: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-outcome/${outcome}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByHoldReason(holdReason: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDisposition(disposition: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-disposition/${disposition}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis9(diagnosis9: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis9/${diagnosis9}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis8(diagnosis8: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis8/${diagnosis8}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis7(diagnosis7: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis7/${diagnosis7}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis5(diagnosis5: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis5/${diagnosis5}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis4(diagnosis4: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis4/${diagnosis4}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis3(diagnosis3: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis3/${diagnosis3}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis1(diagnosis1: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis1/${diagnosis1}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDeniedReason(deniedReason: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-deniedreason/${deniedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByClosedReason(closedReason: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-closedreason/${closedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySurgProcedure5(surgProcedure5: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure5/${surgProcedure5}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySurgProcedure4(surgProcedure4: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure4/${surgProcedure4}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySurgProcedure1(surgProcedure1: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-surgprocedure1/${surgProcedure1}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByImpact(impact: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-impact/${impact}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDischargeDiagnosis(dischargeDiagnosis: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-dischargediagnosis/${dischargeDiagnosis}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis6(diagnosis6: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis6/${diagnosis6}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis2(diagnosis2: string): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-diagnosis2/${diagnosis2}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createAuthMaster(authMaster: AuthMaster): Observable<any> {
        let body = JSON.stringify(authMaster);
        return this.httpClient.post(this.authMasterUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthMaster(authMaster: AuthMaster, authNumber: string): Observable<any> {
        let body = JSON.stringify(authMaster);
        return this.httpClient.put(`${this.authMasterUrl}/${authNumber}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthMaster(authMaster: AuthMaster, authNumber: number): Observable<any> {
        let body = JSON.stringify(authMaster);
        return this.httpClient.patch(`${this.authMasterUrl}/${authNumber}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthMaster(authNumber: any): Observable<any> {
        return this.httpClient.delete(`${this.authMasterUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findListByAuthNumber(authNumber: number): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-authNo/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
    findAuthProvidersByAuthNumber(authNumber : number) {
        return this.httpClient.get(`${this.authProviderUrl}/find-by-auth-no/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findByAuthNumber(authNumber: number): Observable<AuthMaster[]> {
        return this.httpClient.get(`${this.authMasterUrl}/find-by-authnumber/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthMaster),
                catchError(this.sharedService.handleError))
    }
}
