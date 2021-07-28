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

import { SmfolderSService } from './smfolder-s.service';
import { SmfolderS } from '../api-models/smfolder-s.model'
import { SmfolderSs } from "../api-models/testing/fake-smfolder-s.model"

describe('SmfolderSService', () => {
  let injector: TestBed;
  let service: SmfolderSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmfolderSService]
    });
    injector = getTestBed();
    service = injector.get(SmfolderSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmfolderSs', () => {
    it('should return an Promise<SmfolderS[]>', () => {
      const smfolderS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, folderFoldername:'sample data', folderDescription:'sample data', folderLastupdate:'2018-01-01', folderUserdata1:1234, folderUserdata2:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, folderFoldername:'sample data', folderDescription:'sample data', folderLastupdate:'2018-01-01', folderUserdata1:1234, folderUserdata2:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, folderFoldername:'sample data', folderDescription:'sample data', folderLastupdate:'2018-01-01', folderUserdata1:1234, folderUserdata2:1234}

      ];
      service.getSmfolderSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smfolderss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smfolderS);
    });
  });


  describe('#createSmfolderS', () => {
    var id = 1;
    it('should return an Promise<SmfolderS>', () => {
      const smfolderS: SmfolderS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, folderFoldername:'sample data', folderDescription:'sample data', folderLastupdate:'2018-01-01', folderUserdata1:1234, folderUserdata2:1234};
      service.createSmfolderS(smfolderS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smfolderss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmfolderS', () => {
    var id = 1;
    it('should return an Promise<SmfolderS>', () => {
      const smfolderS: SmfolderS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, folderFoldername:'sample data', folderDescription:'sample data', folderLastupdate:'2018-01-01', folderUserdata1:1234, folderUserdata2:1234};
      service.updateSmfolderS(smfolderS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smfolderss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmfolderS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmfolderS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smfolderss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});