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

import { CiebPremiumMasterService } from './cieb-premium-master.service';
import { CiebPremiumMaster } from '../api-models/cieb-premium-master.model'
import { CiebPremiumMasters } from "../api-models/testing/fake-cieb-premium-master.model"

describe('CiebPremiumMasterService', () => {
  let injector: TestBed;
  let service: CiebPremiumMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebPremiumMasterService]
    });
    injector = getTestBed();
    service = injector.get(CiebPremiumMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebPremiumMasters', () => {
    it('should return an Promise<CiebPremiumMaster[]>', () => {
      const ciebPremiumMaster = [
       {seqGroupId:1234, seqPremId:1234, hsdPlancode:'sample data', rxprimeAcctNum:'sample data', claimDivision:'sample data', policyCode:'sample data', planEffectiveDate:'2018-01-01', planEndDate:'2018-01-01', rxprimePlancodeFlag:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGroupId:1234, seqPremId:1234, hsdPlancode:'sample data', rxprimeAcctNum:'sample data', claimDivision:'sample data', policyCode:'sample data', planEffectiveDate:'2018-01-01', planEndDate:'2018-01-01', rxprimePlancodeFlag:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGroupId:1234, seqPremId:1234, hsdPlancode:'sample data', rxprimeAcctNum:'sample data', claimDivision:'sample data', policyCode:'sample data', planEffectiveDate:'2018-01-01', planEndDate:'2018-01-01', rxprimePlancodeFlag:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebPremiumMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpremiummasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebPremiumMaster);
    });
  });


  describe('#createCiebPremiumMaster', () => {
    var id = 1;
    it('should return an Promise<CiebPremiumMaster>', () => {
      const ciebPremiumMaster: CiebPremiumMaster = {seqGroupId:1234, seqPremId:1234, hsdPlancode:'sample data', rxprimeAcctNum:'sample data', claimDivision:'sample data', policyCode:'sample data', planEffectiveDate:'2018-01-01', planEndDate:'2018-01-01', rxprimePlancodeFlag:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebPremiumMaster(ciebPremiumMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpremiummasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebPremiumMaster', () => {
    var id = 1;
    it('should return an Promise<CiebPremiumMaster>', () => {
      const ciebPremiumMaster: CiebPremiumMaster = {seqGroupId:1234, seqPremId:1234, hsdPlancode:'sample data', rxprimeAcctNum:'sample data', claimDivision:'sample data', policyCode:'sample data', planEffectiveDate:'2018-01-01', planEndDate:'2018-01-01', rxprimePlancodeFlag:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebPremiumMaster(ciebPremiumMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpremiummasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebPremiumMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebPremiumMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpremiummasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});