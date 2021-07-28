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

import { StageInstDtlSupService } from './stage-inst-dtl-sup.service';
import { StageInstDtlSup } from '../api-models/stage-inst-dtl-sup.model'
import { StageInstDtlSups } from "../api-models/testing/fake-stage-inst-dtl-sup.model"

describe('StageInstDtlSupService', () => {
  let injector: TestBed;
  let service: StageInstDtlSupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageInstDtlSupService]
    });
    injector = getTestBed();
    service = injector.get(StageInstDtlSupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageInstDtlSups', () => {
    it('should return an Promise<StageInstDtlSup[]>', () => {
      const stageInstDtlSup = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', capOutlinerInclExcl:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, countAsDays:'sample data', carveOut:'sample data', systemGenerated:'sample data', printFlagChangeInd:'sample data', auditStatus:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, procedureCode:'sample data', alternateProcCode:'sample data', sysRevCode:'sample data', geoZipRegion:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', capOutlinerInclExcl:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, countAsDays:'sample data', carveOut:'sample data', systemGenerated:'sample data', printFlagChangeInd:'sample data', auditStatus:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, procedureCode:'sample data', alternateProcCode:'sample data', sysRevCode:'sample data', geoZipRegion:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', capOutlinerInclExcl:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, countAsDays:'sample data', carveOut:'sample data', systemGenerated:'sample data', printFlagChangeInd:'sample data', auditStatus:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, procedureCode:'sample data', alternateProcCode:'sample data', sysRevCode:'sample data', geoZipRegion:'sample data'}

      ];
      service.getStageInstDtlSups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtlsups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageInstDtlSup);
    });
  });


  describe('#createStageInstDtlSup', () => {
    var id = 1;
    it('should return an Promise<StageInstDtlSup>', () => {
      const stageInstDtlSup: StageInstDtlSup = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', capOutlinerInclExcl:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, countAsDays:'sample data', carveOut:'sample data', systemGenerated:'sample data', printFlagChangeInd:'sample data', auditStatus:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, procedureCode:'sample data', alternateProcCode:'sample data', sysRevCode:'sample data', geoZipRegion:'sample data'};
      service.createStageInstDtlSup(stageInstDtlSup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtlsups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageInstDtlSup', () => {
    var id = 1;
    it('should return an Promise<StageInstDtlSup>', () => {
      const stageInstDtlSup: StageInstDtlSup = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', capOutlinerInclExcl:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, countAsDays:'sample data', carveOut:'sample data', systemGenerated:'sample data', printFlagChangeInd:'sample data', auditStatus:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, procedureCode:'sample data', alternateProcCode:'sample data', sysRevCode:'sample data', geoZipRegion:'sample data'};
      service.updateStageInstDtlSup(stageInstDtlSup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtlsups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageInstDtlSup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageInstDtlSup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtlsups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});