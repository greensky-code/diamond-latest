/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {IdCardSetupService} from './id-card-setup.service';
import {environment} from "../../../environments/environment";
import {IdCardSetup} from "../../api-models/id-card-setup.model";

describe('IdCardSetupService', () => {
  let injector: TestBed;
  let service: IdCardSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IdCardSetupService]
    });
    injector = getTestBed();
    service = injector.get(IdCardSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIdCardSetups', () => {
    it('should return an Promise<IdCardSetup[]>', () => {
      const idCardSetup = [
       {seqIdprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', seqNarrativeId:1234, idCardTemplate:'sample data', effectiveDateFrom:'2018-01-01', effectiveDateThru:'2018-01-01', orderType:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', template:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'},
       {seqIdprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', seqNarrativeId:1234, idCardTemplate:'sample data', effectiveDateFrom:'2018-01-01', effectiveDateThru:'2018-01-01', orderType:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', template:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'},
       {seqIdprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', seqNarrativeId:1234, idCardTemplate:'sample data', effectiveDateFrom:'2018-01-01', effectiveDateThru:'2018-01-01', orderType:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', template:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'}

      ];
      service.getIdCardSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/idcardsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(idCardSetup);
    });
  });


  describe('#createIdCardSetup', () => {
    var id = 1;
    it('should return an Promise<IdCardSetup>', () => {
      const idCardSetup: IdCardSetup = {seqIdprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', seqNarrativeId:1234, idCardTemplate:'sample data', effectiveDateFrom:'2018-01-01', effectiveDateThru:'2018-01-01', orderType:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', template:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'};
      service.createIdCardSetup(idCardSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIdCardSetup', () => {
    var id = 1;
    it('should return an Promise<IdCardSetup>', () => {
      const idCardSetup: IdCardSetup = {seqIdprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', seqNarrativeId:1234, idCardTemplate:'sample data', effectiveDateFrom:'2018-01-01', effectiveDateThru:'2018-01-01', orderType:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', template:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'};
      service.updateIdCardSetup(idCardSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIdCardSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIdCardSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});