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

import { StagePsclmDtlSupService } from './stage-psclm-dtl-sup.service';
import { StagePsclmDtlSup } from '../api-models/stage-psclm-dtl-sup.model'
import { StagePsclmDtlSups } from "../api-models/testing/fake-stage-psclm-dtl-sup.model"

describe('StagePsclmDtlSupService', () => {
  let injector: TestBed;
  let service: StagePsclmDtlSupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePsclmDtlSupService]
    });
    injector = getTestBed();
    service = injector.get(StagePsclmDtlSupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePsclmDtlSups', () => {
    it('should return an Promise<StagePsclmDtlSup[]>', () => {
      const stagePsclmDtlSup = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', auditStatus:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, geoZipRegion:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', auditStatus:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, geoZipRegion:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', auditStatus:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, geoZipRegion:'sample data'}

      ];
      service.getStagePsclmDtlSups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlsups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePsclmDtlSup);
    });
  });


  describe('#createStagePsclmDtlSup', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtlSup>', () => {
      const stagePsclmDtlSup: StagePsclmDtlSup = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', auditStatus:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, geoZipRegion:'sample data'};
      service.createStagePsclmDtlSup(stagePsclmDtlSup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlsups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePsclmDtlSup', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtlSup>', () => {
      const stagePsclmDtlSup: StagePsclmDtlSup = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', placeOfServicePtr:1234, seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', totalUnits:1234, capFundStatus:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', auditStatus:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', invalidFlags:'sample data', authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, geoZipRegion:'sample data'};
      service.updateStagePsclmDtlSup(stagePsclmDtlSup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlsups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePsclmDtlSup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePsclmDtlSup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlsups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});