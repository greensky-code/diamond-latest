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

import { ProfsvcClaimDetailSpinalService } from './profsvc-claim-detail-spinal.service';
import { ProfsvcClaimDetailSpinal } from '../api-models/profsvc-claim-detail-spinal.model'
import { ProfsvcClaimDetailSpinals } from "../api-models/testing/fake-profsvc-claim-detail-spinal.model"

describe('ProfsvcClaimDetailSpinalService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimDetailSpinalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimDetailSpinalService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimDetailSpinalService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimDetailSpinals', () => {
    it('should return an Promise<ProfsvcClaimDetailSpinal[]>', () => {
      const profsvcClaimDetailSpinal = [
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', spinalLineNumber:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', spinalLineNumber:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', spinalLineNumber:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProfsvcClaimDetailSpinals().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailspinals/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimDetailSpinal);
    });
  });


  describe('#createProfsvcClaimDetailSpinal', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimDetailSpinal>', () => {
      const profsvcClaimDetailSpinal: ProfsvcClaimDetailSpinal = {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', spinalLineNumber:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProfsvcClaimDetailSpinal(profsvcClaimDetailSpinal).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailspinals`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimDetailSpinal', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimDetailSpinal>', () => {
      const profsvcClaimDetailSpinal: ProfsvcClaimDetailSpinal = {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', spinalLineNumber:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProfsvcClaimDetailSpinal(profsvcClaimDetailSpinal, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailspinals/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimDetailSpinal', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimDetailSpinal(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailspinals/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});