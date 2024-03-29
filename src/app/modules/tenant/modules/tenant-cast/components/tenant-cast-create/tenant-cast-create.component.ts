import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  maxLength1000Validator,
  maxLength10Validator,
  maxLength20Validator,
  passwordValidators,
} from 'src/app/validators/common-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-cast-create',
  templateUrl: './tenant-cast-create.component.html',
  styleUrls: [ './tenant-cast-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  files: (File | number)[] | null = null;
  fileUrls: SafeUrl[] | null = null;
  imagesMax = 10;
  detailFormArrayMax = 10;

  fg = new FormGroup({
    publish: new FormControl('0'),
    display_name: new FormControl('', [ maxLength20Validator ]),
    display_name_kana: new FormControl('', [ maxLength20Validator ]),
    is_use_original_image: new FormControl('1'),
    is_opened_face: new FormControl('0'),
    is_newbie: new FormControl('1'),
    is_trial: new FormControl('1'),
    age: new FormControl(''),
    height: new FormControl(''),
    bust: new FormControl(''),
    cup: new FormControl(''),
    waist: new FormControl(''),
    hip: new FormControl(''),
    blood_type: new FormControl(''),
    is_smoker: new FormControl('0'),
    is_irezumi: new FormControl('0'),
    is_tattoo: new FormControl('0'),
    is_shiohuki: new FormControl('0'),
    is_paipan: new FormControl('0'),
    is_pregnant: new FormControl('0'),
    birth_month: new FormControl(''),
    birth_date: new FormControl(''),
    similar_famous: new FormControl('', [ maxLength20Validator ]),
    similar_famous_kana: new FormControl('', [ maxLength20Validator ]),
    sm_barometer: new FormControl(''),
    message: new FormControl('', [ maxLength1000Validator ]),
    is_use_photo_diary: new FormControl('0'),
    login_id: new FormControl('', [ maxLength10Validator ]),
    password: new FormControl('', [ ...passwordValidators ]),
    is_use_video_diary: new FormControl('0'),
    is_use_fan_letter: new FormControl('0'),
    details: new FormArray([]),
    services: new FormControl([]),
    types: new FormControl([]),
    style: new FormControl(''),
  });

  booleanWithNullSelects = this.getBooleanStrSelects('あり', 'なし', '非表示');
  originalSelects = this.getBooleanStrSelects('オリジナル画像', 'NG画像');
  mosaicSelects = this.getBooleanStrSelects('顔出し', 'モザイク');
  yesOrNoSelects = this.getBooleanStrSelects('はい', 'いいえ');
  doSelects = this.getBooleanStrSelects('する', 'しない', '非表示');
  useSelects = this.getBooleanStrSelects('使用', '未使用');

  ageSelects = this.withNullSelect(this.getRangeSelects(18, 60));
  heightSelects = this.withNullSelect(this.getRangeSelects(140, 180));
  bustSelects = this.withNullSelect(this.getRangeSelects(60, 120));
  cupSelects = this.withNullSelect([
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'G', label: 'G' },
    { value: 'H', label: 'H' },
    { value: 'I', label: 'I' },
    { value: 'J', label: 'J' },
    { value: 'K', label: 'K' },
    { value: 'L', label: 'L' },
    { value: 'M', label: 'M' },
    { value: 'N', label: 'N' },
  ]);
  waistSelects = this.withNullSelect(this.getRangeSelects(40, 120));
  hipSelects = this.withNullSelect(this.getRangeSelects(50, 120));
  bloodSelects = this.withNullSelect([
    { value: 'A', label: 'A型' },
    { value: 'B', label: 'B型' },
    { value: 'O', label: 'O型' },
    { value: 'AB', label: 'AB型' },
  ]);
  smSelects = this.withNullSelect(
    this.getRangeSelects(-10, 10).map(s => ({
      ...s,
      label: `${
        parseInt(s.value, 10) < 0 ? 'M度' : parseInt(s.value, 10) > 0 ? 'S度' : ''
      }${
        Math.abs(parseInt(s.value, 10)) * 10
      }%`,
    })),
  );
  monthSelects = this.withNullSelect(this.getRangeSelects(1, 12));
  dateSelects = this.withNullSelect(this.getRangeSelects(1, 31));

  servicesSelects: { value: string; label: string }[] = [];
  typesSelects: { value: string; label: string }[] = [];
  styleSelects: { value: string; label: string }[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantCastService: TenantCastService,
    private tenantMasterService: TenantMasterService,
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private formDataService: FormDataService,
  ) {
  }

  get detailsFormArray() {
    return this.fg.get('details') as FormArray;
  }

  ngOnInit(): void {
    this.s.add(
      this.fg.get('is_use_photo_diary')?.valueChanges.subscribe(res => {
        const isDisabledUser = res !== '1';

        this.fg.get('login_id')?.[isDisabledUser ? 'disable' : 'enable']({ emitEvent: false });
        this.fg.get('password')?.[isDisabledUser ? 'disable' : 'enable']({ emitEvent: false });
        this.fg.get('is_use_video_diary')?.[isDisabledUser ? 'disable' : 'enable']({ emitEvent: false });
        this.fg.get('is_use_fan_letter')?.[isDisabledUser ? 'disable' : 'enable']({ emitEvent: false });
      }),
    );

    this.s.add(this.tenantMasterService.castServiceTypes().subscribe(res => {
      this.servicesSelects = res.map(r => ({ value: r.id.toString(10), label: r.display_name }));
      this.changeDetectorRef.markForCheck();
    }));
    this.s.add(this.tenantMasterService.castTypes().subscribe(res => {
      this.typesSelects = res.map(r => ({ value: r.id.toString(10), label: r.display_name }));
      this.changeDetectorRef.markForCheck();
    }));
    this.s.add(this.tenantMasterService.castStyleTypes().subscribe(res => {
      this.styleSelects = res.map(r => ({ value: r.id.toString(10), label: r.display_name }));
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    const req = this.formDataService.getFormData(this.fg.value);

    if (this.files) {
      this.files.forEach((f, i) => {
        if (typeof f === 'number') {
          req.set(`images[${ i }][id]`, f.toString(10));
        } else if (f instanceof File) {
          req.set(`images[${ i }][image]`, f);
        }
      });
    } else {
      req.set('images', '');
    }

    this.s.add(
      this.tenantCastService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onPushDetail() {
    this.detailsFormArray.push(new FormGroup({
      title: new FormControl('', [ maxLength20Validator ]),
      detail: new FormControl('', [ maxLength1000Validator ]),
    }));
  }

  onDeleteFile(index: number) {
    this.files = this.files?.filter((f, i) => i !== index) ?? null;
    this.fileUrls = this.fileUrls?.filter((f, i) => i !== index) ?? null;
  }

  onChangeFile(index: number, file: File | null) {
    if (file && this.fileUrls?.[index] && this.files?.[index]) {
      this.files[index] = file;
      this.fileUrls[index] = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  onChangeFiles(files: FileList | null) {
    if (files) {
      const filesArray = Array.prototype.slice.call(files, 0, this.imagesMax - (this.files?.length ?? 0)) as File[];
      this.files = [ ...this.files ?? [], ...filesArray ];

      if (this.files) {
        this.fileUrls = [ ...this.fileUrls ?? [], ...filesArray.map(f => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f))) ];
      }
    }
  }

  private getBooleanStrSelects(trueLabel: string, falseLabel: string, nullLabel?: string): {
    value: string;
    label: string;
  }[] {
    return [
      {
        value: '1',
        label: trueLabel,
      },
      {
        value: '0',
        label: falseLabel,
      },
      ...typeof nullLabel !== 'undefined' ?
        [ {
          value: '',
          label: nullLabel,
        } ] :
        [],
    ];
  }

  private getRangeSelects(min: number, max: number, step = 1): {
    value: string;
    label: string;
  }[] {
    return [
      ...{
        [Symbol.iterator]: function* () {
          let current = min;
          while (current <= max) {
            const cs = current.toString(10);
            yield {
              value: cs,
              label: cs,
            };
            current = current + step;
          }
        },
      },
    ];
  }

  private withNullSelect(selects: { value: string; label: string }[]) {
    return [
      {
        value: '',
        label: '--',
      },
      ...selects,
    ];
  }
}
