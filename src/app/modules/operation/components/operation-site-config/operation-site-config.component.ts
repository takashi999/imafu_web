import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OperationSiteConfigService } from 'src/app/services/operation/api/operation-site-config.service';
import { BehaviorSubject, forkJoin, ObservedValueOf, Subscription } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operation-site-config',
  templateUrl: './operation-site-config.component.html',
  styleUrls: [ './operation-site-config.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationSiteConfigComponent implements OnInit, OnDestroy, AfterViewInit {

  s = new Subscription();
  viewSubject = new BehaviorSubject<{
    res: ObservedValueOf<OperationSiteConfigComponent['res$']>
  } | null>(null);
  res$ = this.operationSiteConfigService.get();
  view$ = multicast(this.viewSubject)(forkJoin({
    res: this.res$,
  }));

  fg = new FormGroup({
    is_enabled_front_basic: new FormControl(false, [ Validators.required ]),
  });

  constructor(
    private operationSiteConfigService: OperationSiteConfigService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.view$.connect());
    this.s.add(this.view$.subscribe(res => {
      if (res) {
        this.fg.patchValue(res.res);
      }
    }));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  ngAfterViewInit() {
  }

  onSubmit() {
    this.s.add(this.operationSiteConfigService.config(this.fg.value).subscribe(res => {
      this.viewSubject.next({
        ...this.viewSubject.getValue(),
        res: res,
      });
    }));
  }

}
