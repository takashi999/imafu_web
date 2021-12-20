import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { OperationConfirmService } from 'src/app/services/operation/operation-confirm.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

type TableListColumnBaseType<T, K extends keyof T | string = keyof T | string> = {
  key: K;
  label: string;
  transform?: (v: any) => string;
  type?: 'image';
}
type TableListColumnTemplateType<TE> = {
  key: string;
  label: string;
  templateRef?: TemplateRef<TE>
  type: 'template';
};
export type TableListColumnType<T, TE = any> = (TableListColumnBaseType<T> | TableListColumnTemplateType<TE> | { key: 'delete' })


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: [ './table-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableListComponent<T, TE> implements OnInit, OnDestroy {

  @Input() dataSource: readonly T[] | DataSource<T> | Observable<readonly T[]> = [];
  @Input() displayedColumns: TableListColumnType<T, TE>[] = [];
  @Output() delete: EventEmitter<T> = new EventEmitter<T>();
  @Output() clickRow: EventEmitter<T> = new EventEmitter<T>();

  s = new Subscription();
  rippleDisable = false;
  imagePreviewOverlayRef: OverlayRef | null = null;

  constructor(
    private operationConfirmService: OperationConfirmService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  get displayedColumnKeys() {
    return this.displayedColumns.map(c => c.key);
  }

  get displayedColumnsExcludedDelete() {
    return this.displayedColumns.filter(c => c.key !== 'delete') as (TableListColumnBaseType<T> | TableListColumnTemplateType<TE>)[];
  }

  @Input() getNameFn: (val: T) => string = val => `${ val }`;

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  getDataByKeyName(element: any, key: any): string {
    return `${ key }`.split('.').reduce((ac, c) => {
      return ac[c];
    }, element);
  }

  getColumnAsBase(col: TableListColumnBaseType<T> | TableListColumnTemplateType<TE>) {
    return col as TableListColumnBaseType<T>;
  }

  getColumnAsTemplate(col: TableListColumnBaseType<T> | TableListColumnTemplateType<TE>) {
    return col as TableListColumnTemplateType<TE>;
  }

  onClickDelete(e: Event, data: T) {
    e.stopPropagation();
    this.onDelete(data);
  }

  onMouseEnter(e: MouseEvent) {
    this.rippleDisable = true;
  }

  onMouseLeave(e: MouseEvent) {
    this.rippleDisable = false;
  }

  onDelete(data: T) {
    this.s.add(
      this.operationConfirmService.open(`${ this.getNameFn(data) }を削除しますか？`)
        .subscribe(() => {
          this.delete.emit(data);
        }),
    );
  }

  onClickRow(data: T) {
    this.clickRow.emit(data);
  }

  onShowPreviewModal(template: TemplateRef<any>, elm: Element) {
    const portal = new TemplatePortal(template, this.viewContainerRef);

    this.imagePreviewOverlayRef = this.overlay.create({
      hasBackdrop: false,
      width: 400,
      height: 400,
      scrollStrategy: this.overlay.scrollStrategies.reposition({
        scrollThrottle: 300,
        autoClose: true,
      }),
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(elm)
        .withPositions([ {
          originX: 'center',
          originY: 'center',
          overlayX: 'center',
          overlayY: 'center',
        } ]),
    });
    const viewRef = this.imagePreviewOverlayRef.attach(portal);
  }

  onHidePreviewModal() {
    if (this.imagePreviewOverlayRef?.hasAttached()) {
      this.imagePreviewOverlayRef?.detach();
    }
  }
}
