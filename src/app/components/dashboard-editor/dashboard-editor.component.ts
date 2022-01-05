import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ckeditor4-angular';
import { ControlValueAccessor, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-editor',
  templateUrl: './dashboard-editor.component.html',
  styleUrls: [ './dashboard-editor.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() hasValidatorFn?: (validator: ValidatorFn) => boolean;
  @ViewChild('editor') editorComponent?: CKEditorComponent;

  config = {
    toolbarGroups: [
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
      { name: 'forms', groups: [ 'forms' ] },
      '/',
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'insert', groups: [ 'insert' ] },
      '/',
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] },
      { name: 'tools', groups: [ 'tools' ] },
      { name: 'others', groups: [ 'others' ] },
      { name: 'about', groups: [ 'about' ] },
    ],
    removeButtons: 'Save,NewPage,ExportPdf,Preview,Print,Templates,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,Image,Flash,PageBreak,Iframe,About',
  };

  fc = new FormControl('');
  s = new Subscription();

  constructor(
    @Optional() @Self() ngControl: NgControl,
  ) {
    if (ngControl !== null) {
      ngControl.valueAccessor = this;
    }
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

  onReady() {
    if (this.editorComponent) {
      const editor = this.editorComponent;
      editor.data = this.fc.value;
      this.s.add(
        this.fc.valueChanges.subscribe(res => {
          editor.data = res;
        }),
      );
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.fc[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

  writeValue(obj: any): void {
    this.fc.setValue(obj, { emitEvent: false });
  }

}
