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

import { AuclsJobCriteriaService } from './aucls-job-criteria.service';
import { AuclsJobCriteria } from '../api-models/aucls-job-criteria.model'
import { AuclsJobCriterias } from "../api-models/testing/fake-aucls-job-criteria.model"

describe('AuclsJobCriteriaService', () => {
  let injector: TestBed;
  let service: AuclsJobCriteriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuclsJobCriteriaService]
    });
    injector = getTestBed();
    service = injector.get(AuclsJobCriteriaService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuclsJobCriterias', () => {
    it('should return an Promise<AuclsJobCriteria[]>', () => {
      const auclsJobCriteria = [
       {seqAuclsJobId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuclsJobId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuclsJobId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuclsJobCriterias().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobcriterias/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auclsJobCriteria);
    });
  });


  describe('#createAuclsJobCriteria', () => {
    var id = 1;
    it('should return an Promise<AuclsJobCriteria>', () => {
      const auclsJobCriteria: AuclsJobCriteria = {seqAuclsJobId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuclsJobCriteria(auclsJobCriteria).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobcriterias`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuclsJobCriteria', () => {
    var id = 1;
    it('should return an Promise<AuclsJobCriteria>', () => {
      const auclsJobCriteria: AuclsJobCriteria = {seqAuclsJobId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuclsJobCriteria(auclsJobCriteria, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobcriterias/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuclsJobCriteria', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuclsJobCriteria(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobcriterias/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});