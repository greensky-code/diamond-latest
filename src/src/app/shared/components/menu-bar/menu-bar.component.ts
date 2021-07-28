import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Menu } from '../../models/models';


@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

    @Output() onMenuClick = new EventEmitter<any>();
    @Input() menus: Menu[];
    menuOpen = false

    constructor(
    ) { }

    ngOnInit() {
    }

    toggleMenuClicked(event) {
        this.menuOpen = event
    }
    menuItemClicked(event, menu, action?) {
        this.onMenuClick.emit({ menu, action });
    }
}
