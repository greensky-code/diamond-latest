/* Copyright (c) 2020 . All Rights Reserved. */

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { MemberWorkingAged } from "../api-models/member-working-aged.model";
import { SharedService } from "../shared/services/shared.service";

@Injectable({
  providedIn: "root"
})
export class MemberWorkingAgedService {

  private memberWorkingAgedUrl: string = `${environment.apiUrl}/memberworkingageds`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getMemberWorkingAgeds(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MemberWorkingAged[]> {
    var url = `${this.memberWorkingAgedUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as MemberWorkingAged[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getMemberWorkingAged(seqMembId: number): Observable<MemberWorkingAged> {
    return this.httpClient.get(`${this.memberWorkingAgedUrl}/${seqMembId}`, { observe: 'response' })
      .pipe(map(response => response.body as MemberWorkingAged),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getMemberWorkingAgedsCount(): Observable<number> {
    var url = `${this.memberWorkingAgedUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findBySeqMembId(seqMembId: number): Observable<MemberWorkingAged[]> {
    return this.httpClient.get(`${this.memberWorkingAgedUrl}/find-by-seqmembid/${seqMembId}`, { observe: 'response' })
      .pipe(map(response => response.body as MemberWorkingAged),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  createMemberWorkingAged(memberWorkingAged: MemberWorkingAged): Observable<any> {
    let body = JSON.stringify(memberWorkingAged);
    return this.httpClient.post(this.memberWorkingAgedUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateMemberWorkingAged(memberWorkingAged: MemberWorkingAged, seqMembId: number): Observable<any> {
    let body = JSON.stringify(memberWorkingAged);
    return this.httpClient.put(`${this.memberWorkingAgedUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateMemberWorkingAged(memberWorkingAged: MemberWorkingAged, seqMembId: number): Observable<any> {
    let body = JSON.stringify(memberWorkingAged);
    return this.httpClient.patch(`${this.memberWorkingAgedUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteMemberWorkingAged(seqMembId: number): Observable<any> {
    return this.httpClient.delete(`${this.memberWorkingAgedUrl}/${seqMembId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
