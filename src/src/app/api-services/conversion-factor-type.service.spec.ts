/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import {async, ComponentFixture, TestBed, inject, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment'

import {ConversionFactorTypeService} from './conversion-factor-type.service';
// @ts-ignore
import {ConversionFactorType} from '../api-models/conversion-factor-type.model'


describe('ConversionFactorTypeService', () => {
    let injector: TestBed;
    let service: ConversionFactorTypeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConversionFactorTypeService]
        });
        injector = getTestBed();
        service = injector.get(ConversionFactorTypeService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
    describe('#getConversionFactorTypes', () => {
        it('should return an Promise<ConversionFactorType[]>', () => {
            const conversionFactorType = [
                {
                    convFactorId: 'sample data',
                    description: 'sample data',
                    securityCode: 'sample data',
                    insertDatetime: '2018-01-01',
                    insertUser: 'sample data',
                    insertProcess: 'sample data',
                    updateDatetime: '2018-01-01',
                    updateUser: 'sample data',
                    updateProcess: 'sample data'
                },
                {
                    convFactorId: 'sample data',
                    description: 'sample data',
                    securityCode: 'sample data',
                    insertDatetime: '2018-01-01',
                    insertUser: 'sample data',
                    insertProcess: 'sample data',
                    updateDatetime: '2018-01-01',
                    updateUser: 'sample data',
                    updateProcess: 'sample data'
                },
                {
                    convFactorId: 'sample data',
                    description: 'sample data',
                    securityCode: 'sample data',
                    insertDatetime: '2018-01-01',
                    insertUser: 'sample data',
                    insertProcess: 'sample data',
                    updateDatetime: '2018-01-01',
                    updateUser: 'sample data',
                    updateProcess: 'sample data'
                }

            ];
            service.getConversionFactorTypes().subscribe(users => {
                expect(users.length).toBe(3);
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactortypes/?use-pagination=false&page=0&size=0`);
            expect(req.request.method).toBe('GET');
            req.flush(conversionFactorType);
        });
    });


    describe('#createConversionFactorType', () => {
        let id = 1;
        it('should return an Promise<ConversionFactorType>', () => {
            const conversionFactorType: ConversionFactorType = {
                convFactorId: 'sample data',
                description: 'sample data',
                securityCode: 'sample data',
                insertDatetime: '2018-01-01',
                insertUser: 'sample data',
                insertProcess: 'sample data',
                updateDatetime: '2018-01-01',
                updateUser: 'sample data',
                updateProcess: 'sample data'
            };
            service.createConversionFactorType(conversionFactorType).subscribe(response => {
                expect(response).toEqual(null);
            });
            const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactortypes`);
            expect(req.request.method).toBe('POST');
            req.flush(null, {status: 200, statusText: 'Ok'});

        });
    });


    describe('#updateConversionFactorType', () => {
        let id = 1;
        it('should return an Promise<ConversionFactorType>', () => {
            const conversionFactorType: ConversionFactorType = {
                convFactorId: 'sample data',
                description: 'sample data',
                securityCode: 'sample data',
                insertDatetime: '2018-01-01',
                insertUser: 'sample data',
                insertProcess: 'sample data',
                updateDatetime: '2018-01-01',
                updateUser: 'sample data',
                updateProcess: 'sample data'
            };
            service.updateConversionFactorType(conversionFactorType, id).subscribe((response: any) => {
                expect(response).toEqual(null);
            });
            const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactortypes/${id}`);
            expect(req.request.method).toBe('PUT');
            req.flush(null, {status: 200, statusText: 'Ok'});
        });
    });


    describe('#deleteConversionFactorType', () => {
        let id = 1;
        it('should call delete method with correct parameter', () => {
            service.deleteConversionFactorType(id).subscribe((response: any) => {
                expect(response).toEqual(null);
            });
            const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactortypes/${id}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null, {status: 400, statusText: 'Ok'});
        });
    });
});
