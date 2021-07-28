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

import { ProcedureUnitValueService } from './procedure-unit-value.service';
import { ProcedureUnitValue } from '../api-models/procedure-unit-value.model'
import { ProcedureUnitValues } from "../api-models/testing/fake-procedure-unit-value.model"

describe('ProcedureUnitValueService', () => {
  let injector: TestBed;
  let service: ProcedureUnitValueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcedureUnitValueService]
    });
    injector = getTestBed();
    service = injector.get(ProcedureUnitValueService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcedureUnitValues', () => {
    it('should return an Promise<ProcedureUnitValue[]>', () => {
      const procedureUnitValue = [
       {procedureCode:'sample data', seqUnitValue:1234, scaleId:'sample data', geographicRegion:'sample data', effectiveDate:'2018-01-01', totalUnits:1234, totalUnitsConvFt:'sample data', professionalUnits:1234, profUnitsConvFt:'sample data', technicalUnits:1234, techUnitsConvFt:'sample data', anesthesiaUnits:1234, anesUnitsConvFt:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {procedureCode:'sample data', seqUnitValue:1234, scaleId:'sample data', geographicRegion:'sample data', effectiveDate:'2018-01-01', totalUnits:1234, totalUnitsConvFt:'sample data', professionalUnits:1234, profUnitsConvFt:'sample data', technicalUnits:1234, techUnitsConvFt:'sample data', anesthesiaUnits:1234, anesUnitsConvFt:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {procedureCode:'sample data', seqUnitValue:1234, scaleId:'sample data', geographicRegion:'sample data', effectiveDate:'2018-01-01', totalUnits:1234, totalUnitsConvFt:'sample data', professionalUnits:1234, profUnitsConvFt:'sample data', technicalUnits:1234, techUnitsConvFt:'sample data', anesthesiaUnits:1234, anesUnitsConvFt:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProcedureUnitValues().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procedureunitvalues/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procedureUnitValue);
    });
  });


  describe('#createProcedureUnitValue', () => {
    var id = 1;
    it('should return an Promise<ProcedureUnitValue>', () => {
      const procedureUnitValue: ProcedureUnitValue = {procedureCode:'sample data', seqUnitValue:1234, scaleId:'sample data', geographicRegion:'sample data', effectiveDate:'2018-01-01', totalUnits:1234, totalUnitsConvFt:'sample data', professionalUnits:1234, profUnitsConvFt:'sample data', technicalUnits:1234, techUnitsConvFt:'sample data', anesthesiaUnits:1234, anesUnitsConvFt:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProcedureUnitValue(procedureUnitValue).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedureunitvalues`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcedureUnitValue', () => {
    var id = 1;
    it('should return an Promise<ProcedureUnitValue>', () => {
      const procedureUnitValue: ProcedureUnitValue = {procedureCode:'sample data', seqUnitValue:1234, scaleId:'sample data', geographicRegion:'sample data', effectiveDate:'2018-01-01', totalUnits:1234, totalUnitsConvFt:'sample data', professionalUnits:1234, profUnitsConvFt:'sample data', technicalUnits:1234, techUnitsConvFt:'sample data', anesthesiaUnits:1234, anesUnitsConvFt:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProcedureUnitValue(procedureUnitValue, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedureunitvalues/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcedureUnitValue', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcedureUnitValue(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedureunitvalues/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});