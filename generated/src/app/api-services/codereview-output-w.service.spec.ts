/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CodereviewOutputWService } from './codereview-output-w.service';
import { CodereviewOutputW } from '../api-models/codereview-output-w.model'
import { CodereviewOutputWs } from "../api-models/testing/fake-codereview-output-w.model"

describe('CodereviewOutputWService', () => {
  let injector: TestBed;
  let service: CodereviewOutputWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodereviewOutputWService]
    });
    injector = getTestBed();
    service = injector.get(CodereviewOutputWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCodereviewOutputWs', () => {
    it('should return an Promise<CodereviewOutputW[]>', () => {
      const codereviewOutputW = [
       {mod2In:'sample data', mod1In:'sample data', modifier2Out:'sample data', histClaimDtlIn:1234, histClaimNoIn:'sample data', billedAmt:1234, codereviewServiceQty:1234, svcToDate:'2018-01-01', svcFromDate:'2018-01-01', expandPointer:1234, crArtificialLineNo:1234, modifier1Out:'sample data', pmatchMsgCode:'sample data', msgCodeOut:'sample data', codeOut:'sample data', pmatchCodeStatus:'sample data', codeStatusOut:'sample data', outputPointer:'sample data', msgCodeIn:'sample data', codeIn:'sample data', codeStatusIn:'sample data', histChangedFlg:'sample data', histLineNumber:1234, histClaimNumber:'sample data', lineNumber:1234, claimNumber:'sample data', loadcount:1234},
       {mod2In:'sample data', mod1In:'sample data', modifier2Out:'sample data', histClaimDtlIn:1234, histClaimNoIn:'sample data', billedAmt:1234, codereviewServiceQty:1234, svcToDate:'2018-01-01', svcFromDate:'2018-01-01', expandPointer:1234, crArtificialLineNo:1234, modifier1Out:'sample data', pmatchMsgCode:'sample data', msgCodeOut:'sample data', codeOut:'sample data', pmatchCodeStatus:'sample data', codeStatusOut:'sample data', outputPointer:'sample data', msgCodeIn:'sample data', codeIn:'sample data', codeStatusIn:'sample data', histChangedFlg:'sample data', histLineNumber:1234, histClaimNumber:'sample data', lineNumber:1234, claimNumber:'sample data', loadcount:1234},
       {mod2In:'sample data', mod1In:'sample data', modifier2Out:'sample data', histClaimDtlIn:1234, histClaimNoIn:'sample data', billedAmt:1234, codereviewServiceQty:1234, svcToDate:'2018-01-01', svcFromDate:'2018-01-01', expandPointer:1234, crArtificialLineNo:1234, modifier1Out:'sample data', pmatchMsgCode:'sample data', msgCodeOut:'sample data', codeOut:'sample data', pmatchCodeStatus:'sample data', codeStatusOut:'sample data', outputPointer:'sample data', msgCodeIn:'sample data', codeIn:'sample data', codeStatusIn:'sample data', histChangedFlg:'sample data', histLineNumber:1234, histClaimNumber:'sample data', lineNumber:1234, claimNumber:'sample data', loadcount:1234}

      ];
      service.getCodereviewOutputWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewoutputws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(codereviewOutputW);
    });
  });


  describe('#createCodereviewOutputW', () => {
    var id = 1;
    it('should return an Promise<CodereviewOutputW>', () => {
      const codereviewOutputW: CodereviewOutputW = {mod2In:'sample data', mod1In:'sample data', modifier2Out:'sample data', histClaimDtlIn:1234, histClaimNoIn:'sample data', billedAmt:1234, codereviewServiceQty:1234, svcToDate:'2018-01-01', svcFromDate:'2018-01-01', expandPointer:1234, crArtificialLineNo:1234, modifier1Out:'sample data', pmatchMsgCode:'sample data', msgCodeOut:'sample data', codeOut:'sample data', pmatchCodeStatus:'sample data', codeStatusOut:'sample data', outputPointer:'sample data', msgCodeIn:'sample data', codeIn:'sample data', codeStatusIn:'sample data', histChangedFlg:'sample data', histLineNumber:1234, histClaimNumber:'sample data', lineNumber:1234, claimNumber:'sample data', loadcount:1234};
      service.createCodereviewOutputW(codereviewOutputW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewoutputws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCodereviewOutputW', () => {
    var id = 1;
    it('should return an Promise<CodereviewOutputW>', () => {
      const codereviewOutputW: CodereviewOutputW = {mod2In:'sample data', mod1In:'sample data', modifier2Out:'sample data', histClaimDtlIn:1234, histClaimNoIn:'sample data', billedAmt:1234, codereviewServiceQty:1234, svcToDate:'2018-01-01', svcFromDate:'2018-01-01', expandPointer:1234, crArtificialLineNo:1234, modifier1Out:'sample data', pmatchMsgCode:'sample data', msgCodeOut:'sample data', codeOut:'sample data', pmatchCodeStatus:'sample data', codeStatusOut:'sample data', outputPointer:'sample data', msgCodeIn:'sample data', codeIn:'sample data', codeStatusIn:'sample data', histChangedFlg:'sample data', histLineNumber:1234, histClaimNumber:'sample data', lineNumber:1234, claimNumber:'sample data', loadcount:1234};
      service.updateCodereviewOutputW(codereviewOutputW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewoutputws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCodereviewOutputW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCodereviewOutputW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewoutputws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});