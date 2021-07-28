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

import { ProcedureCodeMasterArcService } from './procedure-code-master-arc.service';
import { ProcedureCodeMasterArc } from '../api-models/procedure-code-master-arc.model'
import { ProcedureCodeMasterArcs } from "../api-models/testing/fake-procedure-code-master-arc.model"

describe('ProcedureCodeMasterArcService', () => {
  let injector: TestBed;
  let service: ProcedureCodeMasterArcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcedureCodeMasterArcService]
    });
    injector = getTestBed();
    service = injector.get(ProcedureCodeMasterArcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcedureCodeMasterArcs', () => {
    it('should return an Promise<ProcedureCodeMasterArc[]>', () => {
      const procedureCodeMasterArc = [
       {changeDateTime:'2018-01-01', changedBy:'sample data', changeType:'sample data', seqProcChangeId:1234, procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'},
       {changeDateTime:'2018-01-01', changedBy:'sample data', changeType:'sample data', seqProcChangeId:1234, procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'},
       {changeDateTime:'2018-01-01', changedBy:'sample data', changeType:'sample data', seqProcChangeId:1234, procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'}

      ];
      service.getProcedureCodeMasterArcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasterarcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procedureCodeMasterArc);
    });
  });


  describe('#createProcedureCodeMasterArc', () => {
    var id = 1;
    it('should return an Promise<ProcedureCodeMasterArc>', () => {
      const procedureCodeMasterArc: ProcedureCodeMasterArc = {changeDateTime:'2018-01-01', changedBy:'sample data', changeType:'sample data', seqProcChangeId:1234, procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'};
      service.createProcedureCodeMasterArc(procedureCodeMasterArc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasterarcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcedureCodeMasterArc', () => {
    var id = 1;
    it('should return an Promise<ProcedureCodeMasterArc>', () => {
      const procedureCodeMasterArc: ProcedureCodeMasterArc = {changeDateTime:'2018-01-01', changedBy:'sample data', changeType:'sample data', seqProcChangeId:1234, procedureCode:'sample data', shortDescription:'sample data', asteriskProcedure:'sample data', fullDescription:'sample data', primaryGrouping:'sample data', secondaryGrouping:'sample data', followUpDays:1234, codeClass:'sample data', countAsDays:'sample data', holdReason:'sample data', holdDate:'2018-01-01', bilateralAlternate:'sample data', blockIndicator:'sample data', blockStartProc:'sample data', userDefined1:'sample data', userDefined2:'sample data', allowedReason:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', targetRevCodeFlg:'sample data', priceIndicatorFlg:'sample data', productServiceIdQualifier:'sample data', toothNumberRequired:'sample data', surfaceRequired:'sample data', archRequired:'sample data', quadrantRequired:'sample data', oralCavityRequired:'sample data', weightedValue:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', instAuthDtlLnk:'sample data'};
      service.updateProcedureCodeMasterArc(procedureCodeMasterArc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasterarcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcedureCodeMasterArc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcedureCodeMasterArc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedurecodemasterarcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});