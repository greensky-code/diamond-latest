import { Injectable } from '@angular/core';
import { MenuResponse } from '../../api-models/menu-response';
import { SecWinViewModel } from '../../view-model/security/sec-win-view-model';
import { DropDownItem, Menu } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: Menu[] = [];
  menuResponse:MenuResponse;

  dropdownItems: DropDownItem[] = [];
  dropdownItemsobj?: DropDownItem[] = [];
  public isSuperUser = false;

  getMenuList(menu: Menu[], secWin: SecWinViewModel) {
    this.menu=[];
    this.dropdownItems=[];
    this.dropdownItemsobj=[];
    this.menuResponse=new MenuResponse();
    this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
    let menuItems: DropDownItem[];
    if (!this.isSuperUser) {
      menu.forEach((menuobj, index) => {
        if (menuobj.menuItem === "File") {
          menuItems = this.getMenuItems(menu[index], secWin);
          menu[index].dropdownItems = menuItems;
          this.menu.push(menu[index]);
        } else {
          this.menu.push(menu[index]);
        }
      });
      this.menuResponse.menus=this.menu;
      this.menuResponse.status=true;
      return this.menuResponse;
    } else {
      this.menuResponse.menus=menu;
      this.menuResponse.status=true;
      return this.menuResponse;
    }
  }

  getMenuItems(menu: Menu, secWin: SecWinViewModel) {
    this.dropdownItems = menu.dropdownItems;
    this.dropdownItems.forEach((dropDownItem, index) => {
      let itemName = dropDownItem.name;
      if (itemName === "New" && (!secWin.hasInsertPermission())) {
        this.dropdownItems[index].disabled = true;
        this.dropdownItemsobj.push(this.dropdownItems[index]);

      } else if (itemName === "Save" && ((!secWin.hasUpdatePermission()) || (!secWin.hasInsertPermission()))) {
        this.dropdownItems[index].disabled = true;
        this.dropdownItemsobj.push(this.dropdownItems[index]);

      } else if (itemName === "Delete" && (!secWin.hasDeletePermission())) {
        this.dropdownItems[index].disabled = true;
        this.dropdownItemsobj.push(this.dropdownItems[index]);
      } else {
        this.dropdownItemsobj.push(this.dropdownItems[index]);
      }
    });
    return this.dropdownItemsobj;
  }

}
