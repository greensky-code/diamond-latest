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

import { StageDnclmDtlSupService } from './stage-dnclm-dtl-sup.service';
import { StageDnclmDtlSup } from '../api-models/stage-dnclm-dtl-sup.model'
import { StageDnclmDtlSups } from "../api-models/testing/fake-stage-dnclm-dtl-sup.model"

describe('StageDnclmDtlSupService', () => {
  let injector: TestBed;
  let service: StageDnclmDtlSupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageDnclmDtlSupService]
    });
    injector = getTestBed();
    service = injector.get(StageDnclmDtlSupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageDnclmDtlSups', () => {
    it('should return an Promise<StageDnclmDtlSup[]>', () => {
      const stageDnclmDtlSup = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', seqCerulId:1234, invalidFlags:'sample data', geoZipRegion:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', seqCerulId:1234, invalidFlags:'sample data', geoZipRegion:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', seqCerulId:1234, invalidFlags:'sample data', geoZipRegion:'sample data'}

      ];
      service.getStageDnclmDtlSups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtlsups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageDnclmDtlSup);
    });
  });


  describe('#createStageDnclmDtlSup', () => {
    var id = 1;
    it('should return an Promise<StageDnclmDtlSup>', () => {
      const stageDnclmDtlSup: StageDnclmDtlSup = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', seqCerulId:1234, invalidFlags:'sample data', geoZipRegion:'sample data'};
      service.createStageDnclmDtlSup(stageDnclmDtlSup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtlsups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageDnclmDtlSup', () => {
    var id = 1;
    it('should return an Promise<StageDnclmDtlSup>', () => {
      const stageDnclmDtlSup: StageDnclmDtlSup = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', claimStatus:'sample data', processingStatus:'sample data', seqProvId:1234, seqMembId:1234, adjudMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', printFlagChangeInd:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDtl:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, withholdSurplus:1234, bmaAmt:1234, bmaRsn:'sample data', fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, anesInd:'sample data', procCodeClass:'sample data', seqCerulId:1234, invalidFlags:'sample data', geoZipRegion:'sample data'};
      service.updateStageDnclmDtlSup(stageDnclmDtlSup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtlsups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageDnclmDtlSup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageDnclmDtlSup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtlsups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});