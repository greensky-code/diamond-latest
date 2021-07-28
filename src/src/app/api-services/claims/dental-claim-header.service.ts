/* Copyright (c) 2020 . All Rights Reserved. */
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DentalClaimHeader} from '../../api-models/claims/dental-claim-header.model';
import {Observable} from 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class DentalClaimHeaderService {

    private dentalClaimHeaderUrl = `${environment.apiUrl}/dentalclaimheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDentalClaimHeaders(usePagination= false, page = 0, size = 0): Observable<DentalClaimHeader[]> {
        let url = `${this.dentalClaimHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDentalClaimHeader(seqClaimId: number): Observable<DentalClaimHeader> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDentalClaimHeadersCount(): Observable<number> {
        let url = `${this.dentalClaimHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDentalClaimByClaimId(dentalClaim: any): Observable<DentalClaimHeader> {
        let body = JSON.stringify(dentalClaim);
        return this.httpClient.post(`${this.dentalClaimHeaderUrl}/find-by-claim-number`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(null))
    }

    findBySeqProvContract(seqProvContract: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByLineOfBusiness(lineOfBusiness: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPanelId(panelId: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPlanCode(planCode: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-plancode/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqGroupId(seqGroupId: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByRefProvIpaId(refProvIpaId: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-refprovipaid/${refProvIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByProviderIpaId(providerIpaId: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-provideripaid/${providerIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPcpIpaId(pcpIpaId: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-pcpipaid/${pcpIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis7(diagnosis7: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis7/${diagnosis7}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis6(diagnosis6: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis6/${diagnosis6}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis5(diagnosis5: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis5/${diagnosis5}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis3(diagnosis3: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis3/${diagnosis3}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis2(diagnosis2: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis2/${diagnosis2}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqMembId(seqMembId: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvAddress(seqProvAddress: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqprovaddress/${seqProvAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqVendId(seqVendId: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByServiceReason(serviceReason: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-servicereason/${serviceReason}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqCovProvParent(seqCovProvParent: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqcovprovparent/${seqCovProvParent}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqRefProvId(seqRefProvId: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqrefprovid/${seqRefProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvId(seqProvId: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis8(diagnosis8: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis8/${diagnosis8}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis4(diagnosis4: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis4/${diagnosis4}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByDiagnosis1(diagnosis1: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-diagnosis1/${diagnosis1}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByIdAndDate(seqMembId: number, date: string): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-idanddate/${seqMembId}/date/${date}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findById(seqMembId: number): Observable<DentalClaimHeader[]> {
        return this.httpClient.get(`${this.dentalClaimHeaderUrl}/find-by-id/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    createDentalClaimHeader(dentalClaimHeader: DentalClaimHeader): Observable<any> {
        let body = JSON.stringify(dentalClaimHeader);
        return this.httpClient.post(this.dentalClaimHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDentalClaimHeader(dentalClaimHeader: DentalClaimHeader, seqClaimId: number): Observable<any> {
        let body = JSON.stringify(dentalClaimHeader);
        return this.httpClient.put(`${this.dentalClaimHeaderUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateDentalClaimHeader(dentalClaimHeader: DentalClaimHeader, seqClaimId: number): Observable<any> {
        let body = JSON.stringify(dentalClaimHeader);
        return this.httpClient.patch(`${this.dentalClaimHeaderUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDentalClaimHeader(seqClaimId: number): Observable<any> {
        return this.httpClient.delete(`${this.dentalClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
