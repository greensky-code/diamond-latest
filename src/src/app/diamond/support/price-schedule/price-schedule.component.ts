import {
  ChangeDetectorRef,
  Component,
  Renderer2,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewChildren, QueryList
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GridOptions} from 'ag-grid-community';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbToastType} from 'ngb-toast';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {MenuResponse} from '../../../api-models/menu-response';
import {PriceScheduleMaster} from '../../../api-models/price-schedule-master.model';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {PriceScheduleMasterService} from '../../../api-services/price-schedule-master.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {AlertMessage} from '../../../shared/components/alert-message/alert.message.model';
import {AlertMessageService} from '../../../shared/components/alert-message/alert.message.service';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {Menu} from '../../../shared/models/models';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {MenuService} from '../../../shared/services/menu.service';
import {SecurityService} from '../../../shared/services/security.service';
import {CONSTANTS, getPriceScheduleShortcutKeys} from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {DatePipe} from "@angular/common";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

@Component({
  selector: 'app-price-schedule',
  templateUrl: './price-schedule.component.html',
  styleUrls: ['./price-schedule.component.css']
})
export class PriceScheduleComponent implements OnInit {

  priceScheduleForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = 'PSCHD';
  public isSuperUser = false;
  public secProgress = true;
  isReadOnly: boolean = true;
  public menu: Menu[] = [];
  editPriceScheduleMaster: boolean = false;
  priceScheduleMaster: PriceScheduleMaster;
  priceScheduleMasters: PriceScheduleMaster[];
  public shortcuts: ShortcutInput[] = [];
  @Input() showIcon: boolean = false;
  @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  userTemplateId: string;
  searchStatus: boolean = false;
  pressedKey: any[] = [];
  menuOpened= ""
  @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }


  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == 'yes') {
      console.log("button yes has been click!");
    }
    if (button.name == 'no') {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }


  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private datePipe: DatePipe,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private priceScheduleMasterService: PriceScheduleMasterService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageMasterDtlService,
    private toastService: ToastService,
    public activeModal: NgbActiveModal,
    private secUserService: SecUserService,
    private menuSerrvice: MenuService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.hasPermission();
  }

  hasPermission() {
    this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
    this.initializeComponentState();
    let userId = null;
    const parsedToken = this.securityService.getCurrentUserToken();
    if (parsedToken) {
      userId = parsedToken.sub;
    }
    this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
      this.userTemplateId = user.dfltTemplate;
      this.getSecWin(user.dfltTemplate);
    });
  }

  /**
 * Get Permissions
 * @param secUserId
 */
  getSecWin(secUserId: string) {
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
      this.secWin = new SecWinViewModel(secWin);
      if (this.secWin.hasSelectPermission()) {
        this.secProgress = false;

        //Check Menus Privilege Start
        let menuResponse = new MenuResponse();
        menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
        if (menuResponse.status) {
          this.menu = [];
          this.menu = [...menuResponse.menus];
        }
        //Check Menus Privilege End

      } else {
        this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission');
      }
    }, error => {
      this.secProgress = false;
    });
  }

  private initializeComponentState(): void {
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.priceScheduleForm);
    this.createDataGrid();
    this.getPriceScheduleMasters();
  }



  savePriceScheduleMaster() {
    if (this.editPriceScheduleMaster) {
      this.updatePriceScheduleMaster(this.priceScheduleMaster.priceSchedule)
    } else {
      this.createPriceScheduleMaster();
    }
  }

  createPriceScheduleMaster() {
    this.formValidation.validateForm();
    if (this.priceScheduleForm.valid) {
      let priceScheduleMaster = new PriceScheduleMaster();
      priceScheduleMaster.priceSchedule = Form.getValue(this.priceScheduleForm, 'scheduleId');
      priceScheduleMaster.description = Form.getValue(this.priceScheduleForm, 'description');
      this.priceScheduleMasterService.createPriceScheduleMaster(priceScheduleMaster).subscribe(response => {
        this.toastService.showToast('Record successfully created', NgbToastType.Success);
        this.isReadOnly = true;
        this.getPriceScheduleMasters();
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
        }
        this.isFormDataChangeStatus = false;
      }, error => {
        this.isReadOnly = false;
      });

    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
      this.isReadOnly = false;
    }
  }


  updatePriceScheduleMaster(priceSchedule: string) {
    // if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.priceScheduleForm.valid) {
      let priceScheduleMaster = new PriceScheduleMaster();
      priceScheduleMaster.priceSchedule = Form.getValue(this.priceScheduleForm, 'scheduleId');
      priceScheduleMaster.description = Form.getValue(this.priceScheduleForm, 'description');
      this.priceScheduleMasterService.updatePriceScheduleMaster(priceScheduleMaster, priceSchedule).subscribe(response => {
        this.toastService.showToast('Record successfully updated', NgbToastType.Success);
        this.isReadOnly = true;
        this.getPriceScheduleMasters();
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
        }
        this.isFormDataChangeStatus = false;
      }, error => {
        this.isReadOnly = false;
      });
    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
      this.isReadOnly = false;
    }
    // } else {
    //   this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
    // }
  }

  public dataGridGridOptions: GridOptions;
  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;

  dataGridGridOptionsExportCsv() {
    var params = {
    };
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  createDataGrid(): void {
    this.dataGridGridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGridGridOptions.editType = 'fullRow';
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Schedule ID",
        field: "priceSchedule",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Description",
        field: "description",
        width: 200
      }
    ];
  }

  getPriceScheduleMasters() {
    this.priceScheduleMasterService.getPriceScheduleMasters().subscribe(priceScheduleMasters => {
      this.priceScheduleMasters = priceScheduleMasters;
      if (this.priceScheduleMasters !== undefined) {
        this.dataGridGridOptions.api.setRowData(this.priceScheduleMasters);
        this.dataGridGridOptions.api.selectIndex(0, false, false);
        this.isReadOnly = true;
      } else {
        this.dataGridGridOptions.api.setRowData([]);
        this.isReadOnly = false;
      }
    }, error => {
      this.dataGridGridOptions.api.setRowData([]);
      this.isReadOnly = false;
    });
  }

  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.priceScheduleForm = this.formBuilder.group({
      scheduleId: ['', { updateOn: 'blur', validators: [] }],
      description: ['', { updateOn: 'blur', validators: [] }]
    }, { updateOn: 'submit' });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  gridSelectionChange() {
    this.priceScheduleMaster = new PriceScheduleMaster();
    var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      this.searchStatus = true;
      this.priceScheduleMaster = selectedRows[0];
      setTimeout(() => {
        try {
          this.priceScheduleMaster.updateDatetimeDisplay = this.datePipe.transform(
              new Date(this.priceScheduleMaster.updateDatetime),
              "yyyy-MM-dd HH:mm:ss"
          );
          this.priceScheduleMaster.insertDatetimeDisplay = this.datePipe.transform(
              new Date(this.priceScheduleMaster.insertDatetime),
              "yyyy-MM-dd HH:mm:ss"
          );
        } catch (e) {
          console.log(e);
        }
      }, 500);
      this.setPriceScheduleValues(this.priceScheduleMaster);
    } else {
      this.priceScheduleMaster = new PriceScheduleMaster();
      this.setPriceScheduleValues(this.priceScheduleMaster);
    }
  }

  setPriceScheduleValues(priceScheduleMaster: PriceScheduleMaster) {
    this.priceScheduleForm.patchValue({
      scheduleId: priceScheduleMaster.priceSchedule,
      description: priceScheduleMaster.description,
    });
    this.isFormDataModified()
  }


  ngAfterViewInit(): void {
    this.shortcuts.push(...getPriceScheduleShortcutKeys(this));
    this.cdr.detectChanges();
  }

  deletePriceSchedule() {
    if (this.priceScheduleMaster && this.priceScheduleMaster.priceSchedule) {
      this.priceScheduleMasterService.deletePriceScheduleMaster(this.priceScheduleMaster.priceSchedule)
          .subscribe((res) => {
            this.toastService.showToast(
                "Deleted Record Successfully",
                NgbToastType.Success
            );
            this.getPriceScheduleMasters();
          });
    }
  }

  savePriceSchedule() {
    if (!this.isReadOnly) {
      if (this.isSuperUser) {
        this.createPriceScheduleMaster();
      } else {
        if (this.secWin.hasInsertPermission()) {
          this.createPriceScheduleMaster();
        } else {
          this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
            this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
          });
        }
      }
    } else {
      if (this.isSuperUser) {
        this.updatePriceScheduleMaster(this.priceScheduleMaster.priceSchedule);
      }
      else {
        if (this.secWin.hasUpdatePermission()) {
          this.updatePriceScheduleMaster(this.priceScheduleMaster.priceSchedule);
        } else {
          this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
            this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
          });
        }
      }
    }
  }

  createPriceScheduleForm() {
    if (this.isSuperUser) {
      this.createNewPriceSchedule();
    } else {
      if (this.secWin.hasInsertPermission()) {
        this.createNewPriceSchedule();
      } else {
        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
          this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
        });
      }
    }
  }

  createNewPriceSchedule() {
    this.priceScheduleMaster = new PriceScheduleMaster();
    this.setPriceScheduleValues(this.priceScheduleMaster);
    this.priceScheduleForm.reset();
    this.isReadOnly = false;
    this.dataGridGridOptions.api.deselectAll();
  }


  checkPriceShedule(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      let priceSchedule = event.target.value;
      this.priceScheduleMasterService.getPriceScheduleMaster(priceSchedule).subscribe(res => {
        if (res) {
          this.messageService.findByMessageId(7109).subscribe(resp => {
            this.showPopUp('7109: ' + resp[0].messageText, 'Price Schedule');
            setTimeout(() => {
              this.renderer.selectRootElement('#scheduleId').focus();
            }, 500)
          })
        } else {
          setTimeout(() => {
            this.renderer.selectRootElement('#description').focus();
          }, 500)
        }
      }, error => {
      });
    }
  }


  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New", shortcutKey: 'Ctrl + N' },
          { name: "Open", shortcutKey: 'Ctrl + O' },
          { name: "Delete", shortcutKey: 'Ctrl + D' },
          { name: "Save", shortcutKey: 'Ctrl + S' },
          { name: "Close", shortcutKey: 'Ctrl + A4' },
          { isHorizontal: true },
          { name: "Main Menu...", shortcutKey: 'F2' },
          { name: "Shortcut Menu...", shortcutKey: 'F3' },
          { isHorizontal: true },
          { name: "Print", disabled: true },
          { isHorizontal: true },
          { name: "Exit", shortcutKey: 'Alt + A4' },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", disabled: true, shortcutKey: 'Ctrl + Z' },
          { isHorizontal: true },
          { name: "Cut", disabled: true, shortcutKey: 'Ctrl + X' },
          { name: "Copy", disabled: true, shortcutKey: 'Ctrl + C' },
          { name: "Paste", disabled: true, shortcutKey: 'Ctrl + V' },
          { isHorizontal: true },
          { name: "Next", shortcutKey: "F8" },
          { name: "Previous", shortcutKey: "F7" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: "Window",
        dropdownItems: [
          { name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S' },
          { name: 'Audit Display', shortcutKey: 'Shift + Alt + A' },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Tooth RUle" },
          { name: "3 Member COB History" },
          { name: "4 Member COB History" },
          { name: "5 Member COB History" },
          { name: "6 Price Schedule" },
        ],
      },
      {
        menuItem: "Help",
        dropdownItems: [
          { name: "Contents" },
          { name: "Search for Help on..." },
          { name: "This Window", shortcutKey: 'F1' },
          { isHorizontal: true },
          { name: "Glossary" },
          { name: "Getting Started" },
          { name: "How to use Help" },
          { isHorizontal: true },
          { name: "About Diamond Client/Server" },
        ],
      },
    ];
  }


  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createPriceScheduleForm();
          break;
        }
        case "Open": {
          this.getPriceScheduleMasters();
          break;
        }
        case "Delete": {
          this.deletePriceSchedule();
          break;
        }
        case "Save": {
          this.savePriceSchedule();
          break;
        }
        case "Close": {
          this.modalClose();
          break;
        }
        case "Exit": {
          this.exitScreen();
          break;
        }
        case "Shortcut Menu": {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
        default: {
          this.toastService.showToast(
            "Action is not valid",
            NgbToastType.Danger
          );
          break;
        }
      }
    } else if (event.menu.menuItem === "Edit") {
      this.toastService.showToast(
        "Action is not valid",
        NgbToastType.Danger
      );

    } else if (event.menu.menuItem === "Window") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Audit Display": {
          this.openAuditDisplayComponent();
          break;
        }
        case "Show Timestamp": {
          this.openShowTimestampComponent();
          break;
        }
        default: {
          this.toastService.showToast(
            "Action is not valid",
            NgbToastType.Danger
          );
          break;
        }
      }
    } else if (event.menu.menuItem == 'Help') {
      /**
       * Open help modal
       */
      this.helpScreen();
    }
  }

  modalClose() {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Price Schedule')
      })
    } else {
      this.activeModal.close();
    }
  }

  popupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
      popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
      popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp) => {
        if (resp.name === 'Yes') {
          this.savePriceSchedule()
        }
        else if (resp.name === 'No') {
          this.router.navigateByUrl('/');
          if (this.screenCloseRequest === true) {
            this.activeModal.close();
          }
        }
      })
    }
    catch (e) {
      console.log(e);
    }
  };

  isFormDataModified() {
    this.priceScheduleForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }

  helpScreen = () => {
    const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
    viewModal.componentInstance.showIcon = true;
    viewModal.componentInstance.defaultFile = '/PSCHD_Price_Schedule_Codes.htm';
  }

  form1PopupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === 'Ok') {
          this.activeModal.close();
        }
      })
    } catch (e) {
      console.log(e);
    }
  };

  openAuditDisplayComponent() {
    if (this.searchStatus) {
      let status = this.functionalLevelSecurityService.isFunctionIdExist(
          CONSTANTS.F_AUDIT,
          this.windowId
      );
      if (status) {
        let ref = this.modalService.open(AuditDisplayComponent, {
          size: "lg",
        });
        ref.componentInstance.keyNames = "price_schedule";
        ref.componentInstance.keyValues = this.priceScheduleMaster.priceSchedule;
        ref.componentInstance.winID = this.windowId;
        ref.componentInstance.win = 'dw_pschd_de';
        ref.componentInstance.showIcon = true;
      } else {
        this.messageService
            .findByMessageId(11073)
            .subscribe((message: MessageMasterDtl[]) => {
              this.toastService.showToast("11073: " + message[0].messageText, NgbToastType.Danger);
            });
      }
    } else {
      this.messageService
          .findByMessageId(30164)
          .subscribe((message: MessageMasterDtl[]) => {
            this.toastService.showToast("30164: " + message[0].messageText, NgbToastType.Danger);
          });
    }
  }

  openFunctionalGroupShortcut() {
    const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openShowTimestampComponent() {
    const ref = this.modalService.open(TimestampComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.insertDateTime = this.priceScheduleMaster.insertDatetime;
    ref.componentInstance.insertDateTime = this.priceScheduleMaster.insertDatetimeDisplay;
    ref.componentInstance.insertProcess = this.priceScheduleMaster.insertProcess;
    ref.componentInstance.insertUser = this.priceScheduleMaster.insertUser;
    ref.componentInstance.updateUser = this.priceScheduleMaster.updateUser;
    ref.componentInstance.updateDateTime = this.priceScheduleMaster.updateDatetimeDisplay;
    ref.componentInstance.updateProcess = this.priceScheduleMaster.updateProcess;
  }

  exitScreen = () => {
    this.messageService.findByMessageId(29062).subscribe(res => {
      let popMsg = new PopUpMessage(
          'poUpMessageName',
          'DIAMOND @ Client/Server System',
          res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
          'icon');
      popMsg.buttons = [
        new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
        new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
      ];
      let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popMsg;
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === 'Yes') {
          localStorage.removeItem('oldPassword');
          sessionStorage.removeItem("selectedGroup");
          sessionStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
            this.activeModal.close()
          }, 500);
        } else if (resp.name === 'No') {

        }
      });
    })
  };

  openFileMenu() {
    document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownFile"
  }
  openHelpMenu() {
    document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownHelp"
  }
  openWindowMenu() {
    document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownWindow"
  }

  triggerMenus(value) {
    let obj = {}
    if (this.menuBarComponent.first.menuOpen) {
      if (this.menuOpened == "fileDropdownFile") {
        switch (value) {
          case 'm':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'New'
            }
            this.onMenuItemClick(obj)
            break;
          case 'o':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Open'
            }
            this.onMenuItemClick(obj)
            break;
          case 'd':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Delete'
            }
            this.onMenuItemClick(obj)
                break;
          case 's':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Save'
            }
            this.onMenuItemClick(obj)
            break;
          case 'c':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Close'
            }
            this.onMenuItemClick(obj)
            break;
          case 'e':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Exit'
            }
            this.onMenuItemClick(obj)
            break;
        }
      } else  if (this.menuOpened == "fileDropdownWindow") {
        switch (value) {
          case 's':
            obj = {
              menu: {
                menuItem: 'Window'
              },
              action: 'Show Timestamp'
            }
            this.onMenuItemClick(obj)
            break;
          case 'a':
            obj = {
              menu: {
                menuItem: 'Window'
              },
              action: 'Audit Display'
            }
            this.onMenuItemClick(obj)
            break;
          default:
            break;
        }
      } else if (this.menuOpened == 'fileDropdownHelp') {
        switch (value) {
          case 'c':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Contents'
            }
            this.onMenuItemClick(obj);
            break;
          case 's':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Search for Help on...'
            }
            this.onMenuItemClick(obj);
            break;
          case 't':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'This Window'
            }
            this.onMenuItemClick(obj);
            break;
          case 'g':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Glossary'
            }
            this.onMenuItemClick(obj);
            break;
          case 'd':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Getting Started'
            }
            this.onMenuItemClick(obj);
            break;
          case 'h':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'How to use Help'
            }
            this.onMenuItemClick(obj);
            break;
          case 'a':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'About Diamond Client/Server'
            }
            this.onMenuItemClick(obj);
            break;
        }
      }
    }
  };
}
