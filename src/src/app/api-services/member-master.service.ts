/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MemberMaster } from '../api-models/member-master.model'
import { environment } from '../../environments/environment'
import { MemberCOBVerificationInformation } from '../api-models/member-cob-verification-information.model';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';
import {Subscription} from "rxjs";
import {MemberSubidAutogenModel} from '../api-models/member-subid-autogen.model';



@Injectable({
  providedIn: "root",
})
export class MemberMasterService {
  private memberMasterUrl: string = `${environment.apiUrl}/membermasters`;
  private contentHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
    this.contentHeaders = this.contentHeaders.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  getMemberMasters(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<MemberMaster[]> {
    var url = `${this.memberMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as MemberMaster[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getMemberMaster(seqMembId: number): Observable<MemberMaster> {
    return this.httpClient
      .get(`${this.memberMasterUrl}/${seqMembId}`, { observe: "response" })
      .pipe(
        map((response) => response.body as MemberMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getMemberMastersCount(): Observable<number> {
    var url = `${this.memberMasterUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  findByContactTitle(contactTitle: string): Observable<MemberMaster[]> {
    return this.httpClient
      .get(`${this.memberMasterUrl}/find-by-contacttitle/${contactTitle}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as MemberMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByHoldReason(holdReason: string): Observable<MemberMaster[]> {
    return this.httpClient
      .get(`${this.memberMasterUrl}/find-by-holdreason/${holdReason}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as MemberMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByLanguageCode(languageCode: string): Observable<MemberMaster[]> {
    return this.httpClient
      .get(`${this.memberMasterUrl}/find-by-languagecode/${languageCode}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as MemberMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  createMemberMaster(memberMaster: MemberMaster): Observable<any> {
    let body = JSON.stringify(memberMaster);
    return this.httpClient
      .post(this.memberMasterUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateMemberMaster(
    memberMaster: MemberMaster,
    seqMembId: number
  ): Observable<any> {
    let body = JSON.stringify(memberMaster);
    return this.httpClient
      .put(`${this.memberMasterUrl}/${seqMembId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateMemberMasterV2(
    memberMaster: MemberMaster,
    seqMembId: number
  ): Observable<any> {
    let body = JSON.stringify(memberMaster);
    return this.httpClient
      .put(`${this.memberMasterUrl}/v2/${seqMembId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByDiamondAndSubscriberId(
    diamondId: string,
    subscriberId: string
  ): Observable<any> {
    let body = JSON.stringify({
      diamondId: diamondId,
      subscriberId: subscriberId,
    });
    return this.httpClient
      .post(`${this.memberMasterUrl}/find-by-subscriber-diamond`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateMemberMaster(
    memberMaster: MemberMaster,
    seqMembId: number
  ): Observable<any> {
    let body = JSON.stringify(memberMaster);
    return this.httpClient
      .patch(`${this.memberMasterUrl}/${seqMembId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteMemberMaster(seqMembId: number): Observable<any> {
    return this.httpClient
      .delete(`${this.memberMasterUrl}/${seqMembId}`, { observe: "response" })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateMemberCOBVerificationInfo(
    verificationInformation: MemberCOBVerificationInformation
  ): Observable<any> {
    let body = JSON.stringify(verificationInformation);
    return this.httpClient
      .post(`${this.memberMasterUrl}/update/cob-verification-info`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findBySubscriberId(subscriberId: string): Observable<any> {
    let body = JSON.stringify({ subscriberId: subscriberId });
    return this.httpClient
      .post(`${this.memberMasterUrl}/find-by-subscriber`, body, {
        headers: this.contentHeaders,
      })
        .pipe(
            map((response) => response),
            catchError((error: any) => {
                return this.sharedService.handleError(error)
            })
        );
  }

  getNextSequence(): Observable<MemberMaster[]> {
    return this.httpClient
      .get(`${this.memberMasterUrl}/get-next-sequence`, { observe: "response" })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

    getNextSubscriberId(personId: string): Observable<MemberSubidAutogenModel> {
        return this.httpClient
            .post(`${environment.apiUrl}/spsubidautogen`, { personId: personId })
            .pipe(
                map((response) => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                })
            );
    }

  findBySubscriberIdAndPersonNumber(
    subscriberId: string,
    personNumber: string
  ): Observable<any> {
    let body = JSON.stringify({
      subscriberId: subscriberId,
      personNumber: personNumber,
    });
    return this.httpClient
      .post(
        `${this.memberMasterUrl}/find-by-subscriber-and-personnumber`,
        body,
        { headers: this.contentHeaders }
      )
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getAliasResponsiblePart(seq_sub_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_sub_id", seq_sub_id);
    return this.httpClient
      .get(`${this.memberMasterUrl}/find-alias_responsibleparty`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  checkSubId(subscriber_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("subscriber_id", subscriber_id);
    return this.httpClient
      .get(`${this.memberMasterUrl}/check_sub_id`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getContactSource(seq_memb_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_memb_id", seq_memb_id);
    return this.httpClient
      .get(`${this.memberMasterUrl}/find-contact-source`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  handleMemberMasterDeptLookup(lookup: any): Observable<any> {
    let body = JSON.stringify(lookup);
    return this.httpClient
      .post(`${this.memberMasterUrl}/dept/lookup`, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
}
