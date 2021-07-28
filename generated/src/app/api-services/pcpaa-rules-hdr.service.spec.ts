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

import { PcpaaRulesHdrService } from './pcpaa-rules-hdr.service';
import { PcpaaRulesHdr } from '../api-models/pcpaa-rules-hdr.model'
import { PcpaaRulesHdrs } from "../api-models/testing/fake-pcpaa-rules-hdr.model"

describe('PcpaaRulesHdrService', () => {
  let injector: TestBed;
  let service: PcpaaRulesHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpaaRulesHdrService]
    });
    injector = getTestBed();
    service = injector.get(PcpaaRulesHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpaaRulesHdrs', () => {
    it('should return an Promise<PcpaaRulesHdr[]>', () => {
      const pcpaaRulesHdr = [
       {ruleId:'sample data', ruleType:1234, ruleDescr:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ruleId:'sample data', ruleType:1234, ruleDescr:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ruleId:'sample data', ruleType:1234, ruleDescr:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpaaRulesHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaaruleshdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpaaRulesHdr);
    });
  });


  describe('#createPcpaaRulesHdr', () => {
    var id = 1;
    it('should return an Promise<PcpaaRulesHdr>', () => {
      const pcpaaRulesHdr: PcpaaRulesHdr = {ruleId:'sample data', ruleType:1234, ruleDescr:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpaaRulesHdr(pcpaaRulesHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaaruleshdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpaaRulesHdr', () => {
    var id = 1;
    it('should return an Promise<PcpaaRulesHdr>', () => {
      const pcpaaRulesHdr: PcpaaRulesHdr = {ruleId:'sample data', ruleType:1234, ruleDescr:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpaaRulesHdr(pcpaaRulesHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaaruleshdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpaaRulesHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpaaRulesHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaaruleshdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});