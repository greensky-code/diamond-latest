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

import { PcpaaSupportInfoService } from './pcpaa-support-info.service';
import { PcpaaSupportInfo } from '../api-models/pcpaa-support-info.model'
import { PcpaaSupportInfos } from "../api-models/testing/fake-pcpaa-support-info.model"

describe('PcpaaSupportInfoService', () => {
  let injector: TestBed;
  let service: PcpaaSupportInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpaaSupportInfoService]
    });
    injector = getTestBed();
    service = injector.get(PcpaaSupportInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpaaSupportInfos', () => {
    it('should return an Promise<PcpaaSupportInfo[]>', () => {
      const pcpaaSupportInfo = [
       {seqPcpaaInfoId:1234, lineOfBusiness:'sample data', criteriaType:1234, specialtyType:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpaaInfoId:1234, lineOfBusiness:'sample data', criteriaType:1234, specialtyType:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpaaInfoId:1234, lineOfBusiness:'sample data', criteriaType:1234, specialtyType:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpaaSupportInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaasupportinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpaaSupportInfo);
    });
  });


  describe('#createPcpaaSupportInfo', () => {
    var id = 1;
    it('should return an Promise<PcpaaSupportInfo>', () => {
      const pcpaaSupportInfo: PcpaaSupportInfo = {seqPcpaaInfoId:1234, lineOfBusiness:'sample data', criteriaType:1234, specialtyType:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpaaSupportInfo(pcpaaSupportInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaasupportinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpaaSupportInfo', () => {
    var id = 1;
    it('should return an Promise<PcpaaSupportInfo>', () => {
      const pcpaaSupportInfo: PcpaaSupportInfo = {seqPcpaaInfoId:1234, lineOfBusiness:'sample data', criteriaType:1234, specialtyType:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpaaSupportInfo(pcpaaSupportInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaasupportinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpaaSupportInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpaaSupportInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaasupportinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});