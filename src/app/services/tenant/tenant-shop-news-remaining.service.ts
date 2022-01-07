import { Injectable } from '@angular/core';
import { TenantBasicService } from 'src/app/services/tenant/api/tenant-basic.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TenantShopNewsRemainingService {
  private remainingSubject = new BehaviorSubject<number | null>(null);
  public remaining$ = this.remainingSubject.asObservable();

  constructor(
    private tenantBasicService: TenantBasicService,
  ) {
    this.updateRemaining();
  }

  updateRemaining() {
    this.tenantBasicService.get().subscribe(res => this.remainingSubject.next(res.shop_news_remaining));
  }
}
