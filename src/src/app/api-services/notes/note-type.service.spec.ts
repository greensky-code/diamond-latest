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

import { NoteTypeService } from './note-type.service';
import { NoteType } from '../api-models/note-type.model'
import { NoteTypes } from "../api-models/testing/fake-note-type.model"

describe('NoteTypeService', () => {
  let injector: TestBed;
  let service: NoteTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteTypeService]
    });
    injector = getTestBed();
    service = injector.get(NoteTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNoteTypes', () => {
    it('should return an Promise<NoteType[]>', () => {
      const noteType = [
       {noteType:'sample data', description:'sample data', noteSecurityCode:'sample data', userDefined1St:'sample data', userDefined2St:'sample data', userDefined3St:'sample data', userDefined4St:'sample data', userDefined5St:'sample data', userDate1St:'sample data', userDate2St:'sample data', userDate3St:'sample data', userDate4St:'sample data', userDate5St:'sample data', allowDelete:'sample data', deleteDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', priority:'sample data', userDefined1Req:'sample data', userDefined2Req:'sample data', userDefined3Req:'sample data', userDefined4Req:'sample data', userDefined5Req:'sample data', userDate1Req:'sample data', userDate2Req:'sample data', userDate3Req:'sample data', userDate4Req:'sample data', userDate5Req:'sample data'},
       {noteType:'sample data', description:'sample data', noteSecurityCode:'sample data', userDefined1St:'sample data', userDefined2St:'sample data', userDefined3St:'sample data', userDefined4St:'sample data', userDefined5St:'sample data', userDate1St:'sample data', userDate2St:'sample data', userDate3St:'sample data', userDate4St:'sample data', userDate5St:'sample data', allowDelete:'sample data', deleteDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', priority:'sample data', userDefined1Req:'sample data', userDefined2Req:'sample data', userDefined3Req:'sample data', userDefined4Req:'sample data', userDefined5Req:'sample data', userDate1Req:'sample data', userDate2Req:'sample data', userDate3Req:'sample data', userDate4Req:'sample data', userDate5Req:'sample data'},
       {noteType:'sample data', description:'sample data', noteSecurityCode:'sample data', userDefined1St:'sample data', userDefined2St:'sample data', userDefined3St:'sample data', userDefined4St:'sample data', userDefined5St:'sample data', userDate1St:'sample data', userDate2St:'sample data', userDate3St:'sample data', userDate4St:'sample data', userDate5St:'sample data', allowDelete:'sample data', deleteDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', priority:'sample data', userDefined1Req:'sample data', userDefined2Req:'sample data', userDefined3Req:'sample data', userDefined4Req:'sample data', userDefined5Req:'sample data', userDate1Req:'sample data', userDate2Req:'sample data', userDate3Req:'sample data', userDate4Req:'sample data', userDate5Req:'sample data'}

      ];
      service.getNoteTypes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/notetypes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(noteType);
    });
  });


  describe('#createNoteType', () => {
    var id = 1;
    it('should return an Promise<NoteType>', () => {
      const noteType: NoteType = {noteType:'sample data', description:'sample data', noteSecurityCode:'sample data', userDefined1St:'sample data', userDefined2St:'sample data', userDefined3St:'sample data', userDefined4St:'sample data', userDefined5St:'sample data', userDate1St:'sample data', userDate2St:'sample data', userDate3St:'sample data', userDate4St:'sample data', userDate5St:'sample data', allowDelete:'sample data', deleteDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', priority:'sample data', userDefined1Req:'sample data', userDefined2Req:'sample data', userDefined3Req:'sample data', userDefined4Req:'sample data', userDefined5Req:'sample data', userDate1Req:'sample data', userDate2Req:'sample data', userDate3Req:'sample data', userDate4Req:'sample data', userDate5Req:'sample data'};
      service.createNoteType(noteType).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notetypes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNoteType', () => {
    var id = 1;
    it('should return an Promise<NoteType>', () => {
      const noteType: NoteType = {noteType:'sample data', description:'sample data', noteSecurityCode:'sample data', userDefined1St:'sample data', userDefined2St:'sample data', userDefined3St:'sample data', userDefined4St:'sample data', userDefined5St:'sample data', userDate1St:'sample data', userDate2St:'sample data', userDate3St:'sample data', userDate4St:'sample data', userDate5St:'sample data', allowDelete:'sample data', deleteDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', priority:'sample data', userDefined1Req:'sample data', userDefined2Req:'sample data', userDefined3Req:'sample data', userDefined4Req:'sample data', userDefined5Req:'sample data', userDate1Req:'sample data', userDate2Req:'sample data', userDate3Req:'sample data', userDate4Req:'sample data', userDate5Req:'sample data'};
      service.updateNoteType(noteType, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notetypes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNoteType', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNoteType(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notetypes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});