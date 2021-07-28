/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { FormatstreetaddressService } from './formatstreetaddress.service';
import { Formatstreetaddress } from '../api-models/formatstreetaddress.model'
import { Formatstreetaddresses } from "../api-models/testing/fake-formatstreetaddress.model"

describe('FormatstreetaddressService', () => {
  let injector: TestBed;
  let service: FormatstreetaddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormatstreetaddressService]
    });
    injector = getTestBed();
    service = injector.get(FormatstreetaddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFormatstreetaddresses', () => {
    it('should return an Promise<Formatstreetaddress[]>', () => {
      const formatstreetaddress = [
       {seqaddrid:1234, seqentityid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data', pUser:'sample data'},
       {seqaddrid:1234, seqentityid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data', pUser:'sample data'},
       {seqaddrid:1234, seqentityid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data', pUser:'sample data'}

      ];
      service.getFormatstreetaddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/formatstreetaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(formatstreetaddress);
    });
  });


  describe('#createFormatstreetaddress', () => {
    var id = 1;
    it('should return an Promise<Formatstreetaddress>', () => {
      const formatstreetaddress: Formatstreetaddress = {seqaddrid:1234, seqentityid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data', pUser:'sample data'};
      service.createFormatstreetaddress(formatstreetaddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/formatstreetaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFormatstreetaddress', () => {
    var id = 1;
    it('should return an Promise<Formatstreetaddress>', () => {
      const formatstreetaddress: Formatstreetaddress = {seqaddrid:1234, seqentityid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data', pUser:'sample data'};
      service.updateFormatstreetaddress(formatstreetaddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/formatstreetaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFormatstreetaddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFormatstreetaddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/formatstreetaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});