/* Copyright (c) 2021 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment'

import {CiebPhoneService} from './cieb-phone.service';
import {CiebPhone} from '../api-models/cieb-phone.model'

describe('CiebPhoneService', () => {
  let injector: TestBed;
  let service: CiebPhoneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebPhoneService]
    });
    injector = getTestBed();
    service = injector.get(CiebPhoneService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebPhones', () => {
    it('should return an Promise<CiebPhone[]>', () => {
      const ciebPhone = [
       {seqPhoneId:1234, seqEntityId:1234, phoneCode:'sample data', phoneNum:'sample data', phonePrefix:'sample data', phoneExt:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPhoneId:1234, seqEntityId:1234, phoneCode:'sample data', phoneNum:'sample data', phonePrefix:'sample data', phoneExt:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPhoneId:1234, seqEntityId:1234, phoneCode:'sample data', phoneNum:'sample data', phonePrefix:'sample data', phoneExt:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebPhones().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebphones/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebPhone);
    });
  });


  describe('#createCiebPhone', () => {
    var id = 1;
    it('should return an Promise<CiebPhone>', () => {
      const ciebPhone: CiebPhone = {seqPhoneId:1234, seqEntityId:1234, phoneCode:'sample data', phoneNum:'sample data', phonePrefix:'sample data', phoneExt:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebPhone(ciebPhone).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebphones`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebPhone', () => {
    var id = 1;
    it('should return an Promise<CiebPhone>', () => {
      const ciebPhone: CiebPhone = {seqPhoneId:1234, seqEntityId:1234, phoneCode:'sample data', phoneNum:'sample data', phonePrefix:'sample data', phoneExt:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebPhone(ciebPhone, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebphones/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebPhone', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebPhone(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebphones/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
