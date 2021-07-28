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

import { FormatgroupaddressService } from './formatgroupaddress.service';
import { Formatgroupaddress } from '../api-models/formatgroupaddress.model'
import { Formatgroupaddresses } from "../api-models/testing/fake-formatgroupaddress.model"

describe('FormatgroupaddressService', () => {
  let injector: TestBed;
  let service: FormatgroupaddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormatgroupaddressService]
    });
    injector = getTestBed();
    service = injector.get(FormatgroupaddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFormatgroupaddresses', () => {
    it('should return an Promise<Formatgroupaddress[]>', () => {
      const formatgroupaddress = [
       {seqmembid:1234, seqgroupid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data'},
       {seqmembid:1234, seqgroupid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data'},
       {seqmembid:1234, seqgroupid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data'}

      ];
      service.getFormatgroupaddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/formatgroupaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(formatgroupaddress);
    });
  });


  describe('#createFormatgroupaddress', () => {
    var id = 1;
    it('should return an Promise<Formatgroupaddress>', () => {
      const formatgroupaddress: Formatgroupaddress = {seqmembid:1234, seqgroupid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data'};
      service.createFormatgroupaddress(formatgroupaddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/formatgroupaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFormatgroupaddress', () => {
    var id = 1;
    it('should return an Promise<Formatgroupaddress>', () => {
      const formatgroupaddress: Formatgroupaddress = {seqmembid:1234, seqgroupid:1234, addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', addrline4:'sample data', addrline5:'sample data', addrline6:'sample data', addrline7:'sample data', addrline8:'sample data'};
      service.updateFormatgroupaddress(formatgroupaddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/formatgroupaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFormatgroupaddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFormatgroupaddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/formatgroupaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});