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

import { CapAgeBandDetailService } from './cap-age-band-detail.service';
import { CapAgeBandDetail } from '../api-models/cap-age-band-detail.model'
import { CapAgeBandDetails } from "../api-models/testing/fake-cap-age-band-detail.model"

describe('CapAgeBandDetailService', () => {
  let injector: TestBed;
  let service: CapAgeBandDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapAgeBandDetailService]
    });
    injector = getTestBed();
    service = injector.get(CapAgeBandDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapAgeBandDetails', () => {
    it('should return an Promise<CapAgeBandDetail[]>', () => {
      const capAgeBandDetail = [
       {ageBandId:'sample data', seqAgeBandDtl:1234, memberGender:'sample data', ageFrom:1234, ageThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ageBandId:'sample data', seqAgeBandDtl:1234, memberGender:'sample data', ageFrom:1234, ageThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ageBandId:'sample data', seqAgeBandDtl:1234, memberGender:'sample data', ageFrom:1234, ageThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapAgeBandDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capagebanddetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capAgeBandDetail);
    });
  });


  describe('#createCapAgeBandDetail', () => {
    var id = 1;
    it('should return an Promise<CapAgeBandDetail>', () => {
      const capAgeBandDetail: CapAgeBandDetail = {ageBandId:'sample data', seqAgeBandDtl:1234, memberGender:'sample data', ageFrom:1234, ageThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapAgeBandDetail(capAgeBandDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capagebanddetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapAgeBandDetail', () => {
    var id = 1;
    it('should return an Promise<CapAgeBandDetail>', () => {
      const capAgeBandDetail: CapAgeBandDetail = {ageBandId:'sample data', seqAgeBandDtl:1234, memberGender:'sample data', ageFrom:1234, ageThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapAgeBandDetail(capAgeBandDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capagebanddetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapAgeBandDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapAgeBandDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capagebanddetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});