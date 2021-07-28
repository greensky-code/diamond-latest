import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AuthenticationService } from "../../api-services/authentication.service";
import { SecColDetail } from '../../api-models/security/sec-col-detail.model';

const DISABLED = 'disabled';
const FIELD_DISABLED = 'field-disabled';
const TAB_INDEX = 'tabindex';
const TAG_ANCHOR = 'a';

class SecParam {
    secColDetails: SecColDetail[];
    isEditState: boolean;

}

@Directive({
    selector: '[fieldLevelSec]'
})
export class FieldLevelSecDirective implements OnInit, OnChanges {

    @Input() fieldLevelSec: string;              // column name
    @Input('params') secParam: SecParam;

    constructor(private authService: AuthenticationService,
                private eleRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (JSON.parse(sessionStorage.getItem("isSuperUser"))) {
            return;
        }
        if (this.secParam && this.secParam.secColDetails && this.secParam.secColDetails.length > 0) {
            // get the permission
            const permission = this.getSecColPermission();
            if (this.secParam.isEditState) {
                if (permission == 'C') {       // C       Prohibit change of data
                    this.disableElement(this.eleRef.nativeElement);
                } else if (permission == 'V') {  // V       Prohibit View of data
                    this.eleRef.nativeElement.style.display = 'none';
                }
            } else {                                       // --------------------------In case of creating new record remove sec
                if (permission == 'C') {       // C   rm    Prohibit change of data
                    this.disableElement(this.eleRef.nativeElement, false);
                } else if (permission == 'V') {  // V      rm Prohibit View of data
                    this.eleRef.nativeElement.style.display = '';
                }
            }
        }
    }

    /**
     * C       Prohibit change of data
     * V       Prohibit View of data
     */
    getSecColPermission() {
        const matchedCol: SecColDetail = this.secParam.secColDetails.find(col => col.secColDetailPrimaryKey.columnName == this.fieldLevelSec);
        if (matchedCol) {
            return matchedCol.securityInd;
        }
        return null;
    }

    /**
     * Disable/ Enable Field
     * @param el as Element
     * @param isDisable
     * @private
     */
    private disableElement(el: any, isDisable = true,) {
        if (isDisable) {
            if (!el.hasAttribute(DISABLED)) {
                this.renderer.setAttribute(el, FIELD_DISABLED, '');
                this.renderer.setAttribute(el, DISABLED, 'true');

                // disabling anchor tab keyboard event
                if (el.tagName.toLowerCase() === TAG_ANCHOR) {
                    this.renderer.setAttribute(el, TAB_INDEX, '-1');
                }
            }
        } else {                                                        // To Enable field
            if (el.hasAttribute(FIELD_DISABLED)) {
                if (el.getAttribute('disabled') !== '') {
                    el.removeAttribute(DISABLED);
                }
                el.removeAttribute(FIELD_DISABLED);
                if (el.tagName.toLowerCase() === TAG_ANCHOR) {
                    el.removeAttribute(TAB_INDEX);
                }
            }
        }
        if (el.children) {
            for (let ele of el.children) {
                this.disableElement(ele, isDisable);
            }
        }
    }


}
