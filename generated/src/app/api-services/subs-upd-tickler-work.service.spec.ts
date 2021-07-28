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

import { SubsUpdTicklerWorkService } from './subs-upd-tickler-work.service';
import { SubsUpdTicklerWork } from '../api-models/subs-upd-tickler-work.model'
import { SubsUpdTicklerWorks } from "../api-models/testing/fake-subs-upd-tickler-work.model"

describe('SubsUpdTicklerWorkService', () => {
  let injector: TestBed;
  let service: SubsUpdTicklerWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubsUpdTicklerWorkService]
    });
    injector = getTestBed();
    service = injector.get(SubsUpdTicklerWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubsUpdTicklerWorks', () => {
    it('should return an Promise<SubsUpdTicklerWork[]>', () => {
      const subsUpdTicklerWork = [
       {seqSubsId:1234},
       {seqSubsId:1234},
       {seqSubsId:1234}

      ];
      service.getSubsUpdTicklerWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/subsupdticklerworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(subsUpdTicklerWork);
    });
  });


  describe('#createSubsUpdTicklerWork', () => {
    var id = 1;
    it('should return an Promise<SubsUpdTicklerWork>', () => {
      const subsUpdTicklerWork: SubsUpdTicklerWork = {seqSubsId:1234};
      service.createSubsUpdTicklerWork(subsUpdTicklerWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subsupdticklerworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubsUpdTicklerWork', () => {
    var id = 1;
    it('should return an Promise<SubsUpdTicklerWork>', () => {
      const subsUpdTicklerWork: SubsUpdTicklerWork = {seqSubsId:1234};
      service.updateSubsUpdTicklerWork(subsUpdTicklerWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subsupdticklerworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubsUpdTicklerWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubsUpdTicklerWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subsupdticklerworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});