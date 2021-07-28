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

import { ProcLoadNoteService } from './proc-load-note.service';
import { ProcLoadNote } from '../api-models/proc-load-note.model'
import { ProcLoadNotes } from "../api-models/testing/fake-proc-load-note.model"

describe('ProcLoadNoteService', () => {
  let injector: TestBed;
  let service: ProcLoadNoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcLoadNoteService]
    });
    injector = getTestBed();
    service = injector.get(ProcLoadNoteService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcLoadNotes', () => {
    it('should return an Promise<ProcLoadNote[]>', () => {
      const procLoadNote = [
       {pGroupId:'sample data', pProvInd:'sample data', pUserId:'sample data'},
       {pGroupId:'sample data', pProvInd:'sample data', pUserId:'sample data'},
       {pGroupId:'sample data', pProvInd:'sample data', pUserId:'sample data'}

      ];
      service.getProcLoadNotes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procloadnotes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procLoadNote);
    });
  });


  describe('#createProcLoadNote', () => {
    var id = 1;
    it('should return an Promise<ProcLoadNote>', () => {
      const procLoadNote: ProcLoadNote = {pGroupId:'sample data', pProvInd:'sample data', pUserId:'sample data'};
      service.createProcLoadNote(procLoadNote).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procloadnotes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcLoadNote', () => {
    var id = 1;
    it('should return an Promise<ProcLoadNote>', () => {
      const procLoadNote: ProcLoadNote = {pGroupId:'sample data', pProvInd:'sample data', pUserId:'sample data'};
      service.updateProcLoadNote(procLoadNote, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procloadnotes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcLoadNote', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcLoadNote(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procloadnotes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});