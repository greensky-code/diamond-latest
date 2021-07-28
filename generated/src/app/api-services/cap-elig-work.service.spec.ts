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

import { CapEligWorkService } from './cap-elig-work.service';
import { CapEligWork } from '../api-models/cap-elig-work.model'
import { CapEligWorks } from "../api-models/testing/fake-cap-elig-work.model"

describe('CapEligWorkService', () => {
  let injector: TestBed;
  let service: CapEligWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapEligWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapEligWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapEligWorks', () => {
    it('should return an Promise<CapEligWork[]>', () => {
      const capEligWork = [
       {seqCcalcId:1234, seqCapEligWork:1234, seqEligHist:1234, seqMembId:1234, currentRetro:'sample data', addSubtract:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', medicareStatusFlag:'sample data', otherStatusFlag:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, userDefined1:'sample data', age:1234, gender:'sample data', arcEffectiveDate:'2018-01-01', arcTermDate:'2018-01-01', curEffectiveDate:'2018-01-01', curTerminationDate:'2018-01-01'},
       {seqCcalcId:1234, seqCapEligWork:1234, seqEligHist:1234, seqMembId:1234, currentRetro:'sample data', addSubtract:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', medicareStatusFlag:'sample data', otherStatusFlag:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, userDefined1:'sample data', age:1234, gender:'sample data', arcEffectiveDate:'2018-01-01', arcTermDate:'2018-01-01', curEffectiveDate:'2018-01-01', curTerminationDate:'2018-01-01'},
       {seqCcalcId:1234, seqCapEligWork:1234, seqEligHist:1234, seqMembId:1234, currentRetro:'sample data', addSubtract:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', medicareStatusFlag:'sample data', otherStatusFlag:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, userDefined1:'sample data', age:1234, gender:'sample data', arcEffectiveDate:'2018-01-01', arcTermDate:'2018-01-01', curEffectiveDate:'2018-01-01', curTerminationDate:'2018-01-01'}

      ];
      service.getCapEligWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capeligworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capEligWork);
    });
  });


  describe('#createCapEligWork', () => {
    var id = 1;
    it('should return an Promise<CapEligWork>', () => {
      const capEligWork: CapEligWork = {seqCcalcId:1234, seqCapEligWork:1234, seqEligHist:1234, seqMembId:1234, currentRetro:'sample data', addSubtract:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', medicareStatusFlag:'sample data', otherStatusFlag:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, userDefined1:'sample data', age:1234, gender:'sample data', arcEffectiveDate:'2018-01-01', arcTermDate:'2018-01-01', curEffectiveDate:'2018-01-01', curTerminationDate:'2018-01-01'};
      service.createCapEligWork(capEligWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capeligworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapEligWork', () => {
    var id = 1;
    it('should return an Promise<CapEligWork>', () => {
      const capEligWork: CapEligWork = {seqCcalcId:1234, seqCapEligWork:1234, seqEligHist:1234, seqMembId:1234, currentRetro:'sample data', addSubtract:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', medicareStatusFlag:'sample data', otherStatusFlag:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, userDefined1:'sample data', age:1234, gender:'sample data', arcEffectiveDate:'2018-01-01', arcTermDate:'2018-01-01', curEffectiveDate:'2018-01-01', curTerminationDate:'2018-01-01'};
      service.updateCapEligWork(capEligWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capeligworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapEligWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapEligWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capeligworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});