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

import { EpiProcessFilesService } from './epi-process-files.service';
import { EpiProcessFiles } from '../api-models/epi-process-files.model'
import { EpiProcessFileses } from "../api-models/testing/fake-epi-process-files.model"

describe('EpiProcessFilesService', () => {
  let injector: TestBed;
  let service: EpiProcessFilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpiProcessFilesService]
    });
    injector = getTestBed();
    service = injector.get(EpiProcessFilesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEpiProcessFileses', () => {
    it('should return an Promise<EpiProcessFiles[]>', () => {
      const epiProcessFiles = [
       {seqSessionId:1234, fileId:1234, fileName:'sample data', inputOrOutput:'sample data', deleteFlag:'sample data'},
       {seqSessionId:1234, fileId:1234, fileName:'sample data', inputOrOutput:'sample data', deleteFlag:'sample data'},
       {seqSessionId:1234, fileId:1234, fileName:'sample data', inputOrOutput:'sample data', deleteFlag:'sample data'}

      ];
      service.getEpiProcessFileses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessfileses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(epiProcessFiles);
    });
  });


  describe('#createEpiProcessFiles', () => {
    var id = 1;
    it('should return an Promise<EpiProcessFiles>', () => {
      const epiProcessFiles: EpiProcessFiles = {seqSessionId:1234, fileId:1234, fileName:'sample data', inputOrOutput:'sample data', deleteFlag:'sample data'};
      service.createEpiProcessFiles(epiProcessFiles).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessfileses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEpiProcessFiles', () => {
    var id = 1;
    it('should return an Promise<EpiProcessFiles>', () => {
      const epiProcessFiles: EpiProcessFiles = {seqSessionId:1234, fileId:1234, fileName:'sample data', inputOrOutput:'sample data', deleteFlag:'sample data'};
      service.updateEpiProcessFiles(epiProcessFiles, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessfileses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEpiProcessFiles', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEpiProcessFiles(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessfileses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});