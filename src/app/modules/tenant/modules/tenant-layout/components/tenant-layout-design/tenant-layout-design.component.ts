import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantLayoutService } from 'src/app/services/tenant/api/tenant-layout.service';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { TenantLayout } from 'src/app/services/tenant/api/responses';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tenant-layout-design',
  templateUrl: './tenant-layout-design.component.html',
  styleUrls: [ './tenant-layout-design.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLayoutDesignComponent implements OnInit, OnDestroy {
  s = new Subscription();
  viewSubject = new BehaviorSubject<{
    detail: TenantLayout
  } | null>(null);
  view$ = multicast(this.viewSubject)(forkJoin({
    detail: this.tenantLayoutService.get(),
  }));
  fg = new FormGroup({
    pc_shop_bg_image_size: new FormControl('auto auto'),
    pc_shop_bg_image_attachment: new FormControl('repeat'),
    pc_shop_bg_color: new FormControl('#ffffff'),
    use_pc_shop_bg_image: new FormControl(false),
    pc_shop_bg_image: new FormControl(null),
  });

  fileUrl: SafeResourceUrl | null = null;

  usePcShopBgImageSelects = [ {
    value: true,
    label: '画像を登録する',
  }, {
    value: false,
    label: '画像を指定しない',
  } ];
  imageSizeSelects = [ { value: 'auto auto', label: '等倍' }, { value: '100% auto', label: 'ウィンドウ幅に合わせる' } ];
  imageAttachmentSelects = [ { value: 'scroll', label: 'スクロール' }, { value: 'fixed', label: '固定' } ];

  constructor(
    private tenantLayoutService: TenantLayoutService,
    private formDataService: FormDataService,
    private domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.view$.connect());
    this.s.add(this.view$.subscribe(res => {
      this.fg.patchValue({
        pc_shop_bg_image_size: res?.detail.pc_shop_bg_image_size ?? null,
        pc_shop_bg_image_attachment: res?.detail.pc_shop_bg_image_attachment ?? null,
        pc_shop_bg_color: res?.detail.pc_shop_bg_color ?? null,
        use_pc_shop_bg_image: (res?.detail.bg_image_file_path ?? null) !== null,
        pc_shop_bg_image: null,
      });
      this.fileUrl = res?.detail.bg_image_file_url ?? null;
    }));
    this.s.add(this.fg.get('use_pc_shop_bg_image')?.valueChanges.subscribe(res => {
      this.fg.get('pc_shop_bg_image')?.[res ? 'enable' : 'disable']({ emitEvent: false });
    }));
  }

  ngOnDestroy(): void {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.tenantLayoutService.modifyDesign(this.formDataService.getFormData(this.fg.value))
        .subscribe(res => {
          this.viewSubject.next({
            ...this.viewSubject.getValue(),
            detail: res,
          });
        }),
    );
  }

  onChangeFile(file: File | null) {
    this.fg.patchValue({
      pc_shop_bg_image: file,
    }, { emitEvent: false });
    this.fileUrl = file ?
      this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file)) :
      null;
  }
}
