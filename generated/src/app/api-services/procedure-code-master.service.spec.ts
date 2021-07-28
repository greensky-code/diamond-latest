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

import { ProcedureCodeMasterService } from './procedure-code-master.service';
import { ProcedureCodeMaster } from '../api-models/procedure-code-master.model'
import { ProcedureCodeMasters } from "../api-models/testing/fake-procedure-code-master.model"

describe('ProcedureCodeMasterService', () => {
  let injector: TestBed;
  let service: ProcedureCodeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcedureCodeMasterService]
    });
    injector = getTestBed();
    service = injector.get(ProcedureCodeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcedureCodeMasters', () => {
    it('should return an Promise<ProcedureCodeMaster[]>', () => {
      const procedureCodeMaster = [
       {procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'},
       {procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'},
       {procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'}

      ];
      service.getProcedureCodeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procedureCodeMaster);
    });
  });


  describe('#createProcedureCodeMaster', () => {
    var id = 1;
    it('should return an Promise<ProcedureCodeMaster>', () => {
      const procedureCodeMaster: ProcedureCodeMaster = {procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'};
      service.createProcedureCodeMaster(procedureCodeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcedureCodeMaster', () => {
    var id = 1;
    it('should return an Promise<ProcedureCodeMaster>', () => {
      const procedureCodeMaster: ProcedureCodeMaster = {procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'};
      service.updateProcedureCodeMaster(procedureCodeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcedureCodeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcedureCodeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});