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

import { PcpaaRulesDtlService } from './pcpaa-rules-dtl.service';
import { PcpaaRulesDtl } from '../api-models/pcpaa-rules-dtl.model'
import { PcpaaRulesDtls } from "../api-models/testing/fake-pcpaa-rules-dtl.model"

describe('PcpaaRulesDtlService', () => {
  let injector: TestBed;
  let service: PcpaaRulesDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpaaRulesDtlService]
    });
    injector = getTestBed();
    service = injector.get(PcpaaRulesDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpaaRulesDtls', () => {
    it('should return an Promise<PcpaaRulesDtl[]>', () => {
      const pcpaaRulesDtl = [
       {ruleId:'sample data', seqAttrbId:1234, urbanToMiles:1234, ruralToMiles:1234, operator:'sample data', userdefValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ruleId:'sample data', seqAttrbId:1234, urbanToMiles:1234, ruralToMiles:1234, operator:'sample data', userdefValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ruleId:'sample data', seqAttrbId:1234, urbanToMiles:1234, ruralToMiles:1234, operator:'sample data', userdefValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpaaRulesDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaarulesdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpaaRulesDtl);
    });
  });


  describe('#createPcpaaRulesDtl', () => {
    var id = 1;
    it('should return an Promise<PcpaaRulesDtl>', () => {
      const pcpaaRulesDtl: PcpaaRulesDtl = {ruleId:'sample data', seqAttrbId:1234, urbanToMiles:1234, ruralToMiles:1234, operator:'sample data', userdefValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpaaRulesDtl(pcpaaRulesDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaarulesdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpaaRulesDtl', () => {
    var id = 1;
    it('should return an Promise<PcpaaRulesDtl>', () => {
      const pcpaaRulesDtl: PcpaaRulesDtl = {ruleId:'sample data', seqAttrbId:1234, urbanToMiles:1234, ruralToMiles:1234, operator:'sample data', userdefValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpaaRulesDtl(pcpaaRulesDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaarulesdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpaaRulesDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpaaRulesDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaarulesdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});