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

import { PcpAutoAssignHdrService } from './pcp-auto-assign-hdr.service';
import { PcpAutoAssignHdr } from '../api-models/pcp-auto-assign-hdr.model'
import { PcpAutoAssignHdrs } from "../api-models/testing/fake-pcp-auto-assign-hdr.model"

describe('PcpAutoAssignHdrService', () => {
  let injector: TestBed;
  let service: PcpAutoAssignHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpAutoAssignHdrService]
    });
    injector = getTestBed();
    service = injector.get(PcpAutoAssignHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpAutoAssignHdrs', () => {
    it('should return an Promise<PcpAutoAssignHdr[]>', () => {
      const pcpAutoAssignHdr = [
       {seqPcpAutoAssgn:1234, lineOfBusiness:'sample data', eventType:1234, reqPcpThreshold:'sample data', membReinstThreshold:'sample data', diamondIdThreshold:'sample data', familyAfflThreshold:'sample data', reqPcpFlag:'sample data', reqPcpOrder:1234, membReinstFlag:'sample data', membReinstOrder:1234, membReinstDays:1234, diamondIdFlag:'sample data', diamondIdOrder:1234, diamondIdDays:1234, familyAfflFlag:'sample data', familyAfflOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpAutoAssgn:1234, lineOfBusiness:'sample data', eventType:1234, reqPcpThreshold:'sample data', membReinstThreshold:'sample data', diamondIdThreshold:'sample data', familyAfflThreshold:'sample data', reqPcpFlag:'sample data', reqPcpOrder:1234, membReinstFlag:'sample data', membReinstOrder:1234, membReinstDays:1234, diamondIdFlag:'sample data', diamondIdOrder:1234, diamondIdDays:1234, familyAfflFlag:'sample data', familyAfflOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpAutoAssgn:1234, lineOfBusiness:'sample data', eventType:1234, reqPcpThreshold:'sample data', membReinstThreshold:'sample data', diamondIdThreshold:'sample data', familyAfflThreshold:'sample data', reqPcpFlag:'sample data', reqPcpOrder:1234, membReinstFlag:'sample data', membReinstOrder:1234, membReinstDays:1234, diamondIdFlag:'sample data', diamondIdOrder:1234, diamondIdDays:1234, familyAfflFlag:'sample data', familyAfflOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpAutoAssignHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassignhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpAutoAssignHdr);
    });
  });


  describe('#createPcpAutoAssignHdr', () => {
    var id = 1;
    it('should return an Promise<PcpAutoAssignHdr>', () => {
      const pcpAutoAssignHdr: PcpAutoAssignHdr = {seqPcpAutoAssgn:1234, lineOfBusiness:'sample data', eventType:1234, reqPcpThreshold:'sample data', membReinstThreshold:'sample data', diamondIdThreshold:'sample data', familyAfflThreshold:'sample data', reqPcpFlag:'sample data', reqPcpOrder:1234, membReinstFlag:'sample data', membReinstOrder:1234, membReinstDays:1234, diamondIdFlag:'sample data', diamondIdOrder:1234, diamondIdDays:1234, familyAfflFlag:'sample data', familyAfflOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpAutoAssignHdr(pcpAutoAssignHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassignhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpAutoAssignHdr', () => {
    var id = 1;
    it('should return an Promise<PcpAutoAssignHdr>', () => {
      const pcpAutoAssignHdr: PcpAutoAssignHdr = {seqPcpAutoAssgn:1234, lineOfBusiness:'sample data', eventType:1234, reqPcpThreshold:'sample data', membReinstThreshold:'sample data', diamondIdThreshold:'sample data', familyAfflThreshold:'sample data', reqPcpFlag:'sample data', reqPcpOrder:1234, membReinstFlag:'sample data', membReinstOrder:1234, membReinstDays:1234, diamondIdFlag:'sample data', diamondIdOrder:1234, diamondIdDays:1234, familyAfflFlag:'sample data', familyAfflOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpAutoAssignHdr(pcpAutoAssignHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassignhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpAutoAssignHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpAutoAssignHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassignhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});