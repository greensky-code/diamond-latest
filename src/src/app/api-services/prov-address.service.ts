/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';
import {ProvAddress} from '../api-models/prov-address.model';

@Injectable({
  providedIn: "root"
})
export class ProvAddressService {

  private provAddressUrl = `${environment.apiUrl}/provaddresses`;
  private contentHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient,
              private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getProvAddresses(usePagination = false, page = 0, size = 0): Observable<ProvAddress[]> {
    let url = `${this.provAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, {observe: 'response'})
    .pipe(map(response => response.body as ProvAddress[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getProvAddress(seqProvAddress: number): Observable<ProvAddress> {
    return this.httpClient.get(`${this.provAddressUrl}/${seqProvAddress}`, {observe: 'response'})
    .pipe(map(response => response.body as ProvAddress),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getProvAddressesCount(): Observable<number> {
    let url = `${this.provAddressUrl}/count`;
    return this.httpClient.get(url, {observe: 'response'})
    .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findBySeqProvId(seqProvId: number): Observable<ProvAddress[]> {
    return this.httpClient.get(`${this.provAddressUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
    .pipe(map(response => response.body as ProvAddress),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  createProvAddress(provAddress: ProvAddress): Observable<any> {
    let body = JSON.stringify(provAddress);
    return this.httpClient.post(this.provAddressUrl, body, {headers: this.contentHeaders})
    .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateProvAddress(provAddress: ProvAddress, seqProvAddress: number): Observable<any> {
    let body = JSON.stringify(provAddress);
    return this.httpClient.put(`${this.provAddressUrl}/${seqProvAddress}`, body, {headers: this.contentHeaders})
    .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateProvAddress(provAddress: ProvAddress, seqProvAddress: number): Observable<any> {
    let body = JSON.stringify(provAddress);
    return this.httpClient.patch(`${this.provAddressUrl}/${seqProvAddress}`, body, {headers: this.contentHeaders})
    .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteProvAddress(seqProvAddress: number): Observable<any> {
    return this.httpClient.delete(`${this.provAddressUrl}/${seqProvAddress}`, {observe: 'response'})
    .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
