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

import { AuclsModelCriteriaService } from './aucls-model-criteria.service';
import { AuclsModelCriteria } from '../api-models/aucls-model-criteria.model'
import { AuclsModelCriterias } from "../api-models/testing/fake-aucls-model-criteria.model"

describe('AuclsModelCriteriaService', () => {
  let injector: TestBed;
  let service: AuclsModelCriteriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuclsModelCriteriaService]
    });
    injector = getTestBed();
    service = injector.get(AuclsModelCriteriaService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuclsModelCriterias', () => {
    it('should return an Promise<AuclsModelCriteria[]>', () => {
      const auclsModelCriteria = [
       {auclsModelId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {auclsModelId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {auclsModelId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuclsModelCriterias().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodelcriterias/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auclsModelCriteria);
    });
  });


  describe('#createAuclsModelCriteria', () => {
    var id = 1;
    it('should return an Promise<AuclsModelCriteria>', () => {
      const auclsModelCriteria: AuclsModelCriteria = {auclsModelId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuclsModelCriteria(auclsModelCriteria).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodelcriterias`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuclsModelCriteria', () => {
    var id = 1;
    it('should return an Promise<AuclsModelCriteria>', () => {
      const auclsModelCriteria: AuclsModelCriteria = {auclsModelId:'sample data', criteriaTypeCode:1234, closedReasonCode:'sample data', daysNo:1234, criteriaAppliedFlag:'sample data', securityCode:'sample data', insertDateTime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuclsModelCriteria(auclsModelCriteria, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodelcriterias/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuclsModelCriteria', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuclsModelCriteria(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodelcriterias/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});