import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) {
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['diamond/user/login']);
            return false;
        }
        return true;
    }

    isAuthenticated() {
        const isLogin = sessionStorage.getItem('isLogin');
        return isLogin === "true";
    }

}