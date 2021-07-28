import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FunctionalGroupsComponent} from "./functional-groups/functional-groups.component";
import {FunctionalGroupShortCutComponent} from "./functional-group-shortcut/functional-group-shortcut.component";
import {SharedModule} from "../../shared/shared.module";
import {MainHelpComponent} from "./main-help/main-help.component";


@NgModule({
    declarations: [
        FunctionalGroupsComponent,
        FunctionalGroupShortCutComponent,
        MainHelpComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        FunctionalGroupsComponent,
        MainHelpComponent
    ]
})
export class MainMenuModule {
}
