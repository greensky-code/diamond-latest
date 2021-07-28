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

import { HoldReleaseRuleSelectService } from './hold-release-rule-select.service';
import { HoldReleaseRuleSelect } from '../api-models/hold-release-rule-select.model'
import { HoldReleaseRuleSelects } from "../api-models/testing/fake-hold-release-rule-select.model"

describe('HoldReleaseRuleSelectService', () => {
  let injector: TestBed;
  let service: HoldReleaseRuleSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HoldReleaseRuleSelectService]
    });
    injector = getTestBed();
    service = injector.get(HoldReleaseRuleSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getHoldReleaseRuleSelects', () => {
    it('should return an Promise<HoldReleaseRuleSelect[]>', () => {
      const holdReleaseRuleSelect = [
       {keyword:'sample data', seqRuleId:1234, reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRuleId:1234, reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRuleId:1234, reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getHoldReleaseRuleSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/holdreleaseruleselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(holdReleaseRuleSelect);
    });
  });


  describe('#createHoldReleaseRuleSelect', () => {
    var id = 1;
    it('should return an Promise<HoldReleaseRuleSelect>', () => {
      const holdReleaseRuleSelect: HoldReleaseRuleSelect = {keyword:'sample data', seqRuleId:1234, reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createHoldReleaseRuleSelect(holdReleaseRuleSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holdreleaseruleselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateHoldReleaseRuleSelect', () => {
    var id = 1;
    it('should return an Promise<HoldReleaseRuleSelect>', () => {
      const holdReleaseRuleSelect: HoldReleaseRuleSelect = {keyword:'sample data', seqRuleId:1234, reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateHoldReleaseRuleSelect(holdReleaseRuleSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holdreleaseruleselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteHoldReleaseRuleSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteHoldReleaseRuleSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holdreleaseruleselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});