/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetPlanListAddon} from "../../api-models"

var procGetPlanListAddon1 = new ProcGetPlanListAddon();
procGetPlanListAddon1.pGroupId ="sample data1";

var procGetPlanListAddon2 = new ProcGetPlanListAddon();
procGetPlanListAddon2.pGroupId ="sample data2";

var procGetPlanListAddon3 = new ProcGetPlanListAddon();
procGetPlanListAddon3.pGroupId ="sample data3";


export const ProcGetPlanListAddons: ProcGetPlanListAddon[] = [
    procGetPlanListAddon1,
    procGetPlanListAddon2,
    procGetPlanListAddon3,
];