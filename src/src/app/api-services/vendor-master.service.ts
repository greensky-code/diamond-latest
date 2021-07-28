import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VendorMaster } from '../api-models/vendor-master';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorMasterService {

  private vendorMasterUrl: string = `${environment.apiUrl}/vendormasters`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getVendorMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<VendorMaster[]> {
    var url = `${this.vendorMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as VendorMaster[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getVendorMaster(seqVendId: number): Observable<VendorMaster> {
    return this.httpClient.get(`${this.vendorMasterUrl}/${seqVendId}`, { observe: 'response' })
      .pipe(map(response => response.body as VendorMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getVendorMastersCount(): Observable<number> {
    var url = `${this.vendorMasterUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  createVendorMaster(vendorMaster: VendorMaster): Observable<any> {
    let body = JSON.stringify(vendorMaster);
    return this.httpClient.post(this.vendorMasterUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateVendorMaster(vendorMaster: VendorMaster, seqVendId: number): Observable<any> {
    let body = JSON.stringify(vendorMaster);
    return this.httpClient.put(`${this.vendorMasterUrl}/${seqVendId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateVendorMaster(vendorMaster: VendorMaster, seqVendId: number): Observable<any> {
    let body = JSON.stringify(vendorMaster);
    return this.httpClient.patch(`${this.vendorMasterUrl}/${seqVendId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteVendorMaster(seqVendId: number): Observable<any> {
    return this.httpClient.delete(`${this.vendorMasterUrl}/${seqVendId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findVendorMasterByVendorId(vendorId: any): Observable<VendorMaster> {
    return this.httpClient.get(`${this.vendorMasterUrl}/find-by-vendorId/${vendorId}`, { observe: 'response' })
      .pipe(map(response => response.body as VendorMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

}
