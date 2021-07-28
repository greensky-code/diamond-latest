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

import { NoteWinLinkService } from './note-win-link.service';
import { NoteWinLink } from '../api-models/note-win-link.model'
import { NoteWinLinks } from "../api-models/testing/fake-note-win-link.model"

describe('NoteWinLinkService', () => {
  let injector: TestBed;
  let service: NoteWinLinkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteWinLinkService]
    });
    injector = getTestBed();
    service = injector.get(NoteWinLinkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNoteWinLinks', () => {
    it('should return an Promise<NoteWinLink[]>', () => {
      const noteWinLink = [
       {winId:'sample data', noteType:'sample data', linkWinId:'sample data', linkContext:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234},
       {winId:'sample data', noteType:'sample data', linkWinId:'sample data', linkContext:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234},
       {winId:'sample data', noteType:'sample data', linkWinId:'sample data', linkContext:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234}

      ];
      service.getNoteWinLinks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/notewinlinks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(noteWinLink);
    });
  });


  describe('#createNoteWinLink', () => {
    var id = 1;
    it('should return an Promise<NoteWinLink>', () => {
      const noteWinLink: NoteWinLink = {winId:'sample data', noteType:'sample data', linkWinId:'sample data', linkContext:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234};
      service.createNoteWinLink(noteWinLink).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notewinlinks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNoteWinLink', () => {
    var id = 1;
    it('should return an Promise<NoteWinLink>', () => {
      const noteWinLink: NoteWinLink = {winId:'sample data', noteType:'sample data', linkWinId:'sample data', linkContext:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234};
      service.updateNoteWinLink(noteWinLink, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notewinlinks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNoteWinLink', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNoteWinLink(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notewinlinks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});