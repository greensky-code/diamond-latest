/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SpCiebUpdatetime} from "../../api-models"

var spCiebUpdatetime1 = new SpCiebUpdatetime();
spCiebUpdatetime1.pProcname ="sample data1";

var spCiebUpdatetime2 = new SpCiebUpdatetime();
spCiebUpdatetime2.pProcname ="sample data2";

var spCiebUpdatetime3 = new SpCiebUpdatetime();
spCiebUpdatetime3.pProcname ="sample data3";


export const SpCiebUpdatetimes: SpCiebUpdatetime[] = [
    spCiebUpdatetime1,
    spCiebUpdatetime2,
    spCiebUpdatetime3,
];