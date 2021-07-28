/* Copyright (c) 2020 . All Rights Reserved. */

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

import { SecUserClmLmtDetailService } from './sec-user-clm-lmt-detail.service';
import { SecUserClmLmtDetail } from '../api-models/sec-user-clm-lmt-detail.model'
import { SecUserClmLmtDetails } from "../api-models/testing/fake-sec-user-clm-lmt-detail.model"

describe('SecUserClmLmtDetailService', () => {
  let injector: TestBed;
  let service: SecUserClmLmtDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecUserClmLmtDetailService]
    });
    injector = getTestBed();
    service = injector.get(SecUserClmLmtDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecUserClmLmtDetails', () => {
    it('should return an Promise<SecUserClmLmtDetail[]>', () => {
      const secUserClmLmtDetail = [
       {userId:'sample data', claimType:'sample data', holdRelClass:'sample data', claimLimit:1234, determinant:'sample data', reasonCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', claimType:'sample data', holdRelClass:'sample data', claimLimit:1234, determinant:'sample data', reasonCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', claimType:'sample data', holdRelClass:'sample data', claimLimit:1234, determinant:'sample data', reasonCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSecUserClmLmtDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secuserclmlmtdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secUserClmLmtDetail);
    });
  });


  describe('#createSecUserClmLmtDetail', () => {
    var id = 1;
    it('should return an Promise<SecUserClmLmtDetail>', () => {
      const secUserClmLmtDetail: SecUserClmLmtDetail = {userId:'sample data', claimType:'sample data', holdRelClass:'sample data', claimLimit:1234, determinant:'sample data', reasonCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSecUserClmLmtDetail(secUserClmLmtDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secuserclmlmtdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecUserClmLmtDetail', () => {
    var id = 1;
    it('should return an Promise<SecUserClmLmtDetail>', () => {
      const secUserClmLmtDetail: SecUserClmLmtDetail = {userId:'sample data', claimType:'sample data', holdRelClass:'sample data', claimLimit:1234, determinant:'sample data', reasonCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSecUserClmLmtDetail(secUserClmLmtDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secuserclmlmtdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecUserClmLmtDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecUserClmLmtDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secuserclmlmtdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});