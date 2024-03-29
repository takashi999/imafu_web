import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/components/app.component';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardTimeRangeFormComponent } from './dashboard-time-range-form/dashboard-time-range-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardInputComponent } from './dashboard-input/dashboard-input.component';
import { DashboardTextareaComponent } from './dashboard-textarea/dashboard-textarea.component';
import { DashboardSelectComponent } from './dashboard-select/dashboard-select.component';
import { MatInputModule } from '@angular/material/input';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { DashboardRadioComponent } from './dashboard-radio/dashboard-radio.component';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardCheckboxComponent } from './dashboard-checkbox/dashboard-checkbox.component';
import { DashboardDatePickerComponent } from './dashboard-date-picker/dashboard-date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DashboardImageComponent } from './dashboard-image/dashboard-image.component';
import { DashboardImageMultipleComponent } from './dashboard-image-multiple/dashboard-image-multiple.component';
import { DashboardSearchComponent } from './dashboard-search/dashboard-search.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardMessageComponent } from './dashboard-message/dashboard-message.component';
import {
  DashboardEditableTextTypeSelectComponent,
} from './dashboard-editable-text-type-select/dashboard-editable-text-type-select.component';
import {
  DashboardMultipleTypeTextareaComponent,
} from './dashboard-multiple-type-textarea/dashboard-multiple-type-textarea.component';
import { DashboardTableTabComponent } from './dashboard-table-tab/dashboard-table-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardTimeSelectComponent } from './dashboard-time-select/dashboard-time-select.component';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardTipComponent } from './dashboard-tip/dashboard-tip.component';


@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    DashboardHeaderComponent,
    DashboardTimeRangeFormComponent,
    DashboardInputComponent,
    DashboardTextareaComponent,
    DashboardSelectComponent,
    DashboardEditorComponent,
    DashboardRadioComponent,
    DashboardCheckboxComponent,
    DashboardDatePickerComponent,
    DashboardImageComponent,
    DashboardImageMultipleComponent,
    DashboardSearchComponent,
    DashboardMessageComponent,
    DashboardEditableTextTypeSelectComponent,
    DashboardMultipleTypeTextareaComponent,
    DashboardTableTabComponent,
    DashboardTimeSelectComponent,
    DashboardTipComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatRippleModule,
    MatButtonModule,
    RouterModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    CKEditorModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    DragDropModule,
    MatTabsModule,
    MatChipsModule,
  ],
  exports: [
    AppComponent,
    TableListComponent,
    DashboardHeaderComponent,
    DashboardTimeRangeFormComponent,
    DashboardInputComponent,
    DashboardTextareaComponent,
    DashboardSelectComponent,
    DashboardEditorComponent,
    DashboardRadioComponent,
    DashboardCheckboxComponent,
    DashboardDatePickerComponent,
    DashboardImageComponent,
    DashboardImageMultipleComponent,
    DashboardSearchComponent,
    DashboardMessageComponent,
    DashboardEditableTextTypeSelectComponent,
    DashboardMultipleTypeTextareaComponent,
    DashboardTableTabComponent,
    DashboardTimeSelectComponent,
    DashboardTipComponent,
  ],
})
export class CommonComponentsModule {
}
