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

import { EpiFilesService } from './epi-files.service';
import { EpiFiles } from '../api-models/epi-files.model'
import { EpiFileses } from "../api-models/testing/fake-epi-files.model"

describe('EpiFilesService', () => {
  let injector: TestBed;
  let service: EpiFilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpiFilesService]
    });
    injector = getTestBed();
    service = injector.get(EpiFilesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEpiFileses', () => {
    it('should return an Promise<EpiFiles[]>', () => {
      const epiFiles = [
       {seqSessionId:1234, fileId:1234, lineNumber:1234, text:'sample data'},
       {seqSessionId:1234, fileId:1234, lineNumber:1234, text:'sample data'},
       {seqSessionId:1234, fileId:1234, lineNumber:1234, text:'sample data'}

      ];
      service.getEpiFileses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/epifileses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(epiFiles);
    });
  });


  describe('#createEpiFiles', () => {
    var id = 1;
    it('should return an Promise<EpiFiles>', () => {
      const epiFiles: EpiFiles = {seqSessionId:1234, fileId:1234, lineNumber:1234, text:'sample data'};
      service.createEpiFiles(epiFiles).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epifileses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEpiFiles', () => {
    var id = 1;
    it('should return an Promise<EpiFiles>', () => {
      const epiFiles: EpiFiles = {seqSessionId:1234, fileId:1234, lineNumber:1234, text:'sample data'};
      service.updateEpiFiles(epiFiles, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epifileses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEpiFiles', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEpiFiles(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epifileses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});