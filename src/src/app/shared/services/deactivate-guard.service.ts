import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

export interface DeactivateComponent {
    canComponentExit: () => Observable<boolean> | boolean;
}


@Injectable({
    providedIn: 'root'
})

export class DeactivateGuardService implements CanDeactivate<DeactivateComponent> {

    component: Object;
    route: ActivatedRouteSnapshot;

    constructor() {
    }

    canDeactivate(component: DeactivateComponent,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot,
                  nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {

        return component.canComponentExit ? component.canComponentExit() : true;
    }

}
