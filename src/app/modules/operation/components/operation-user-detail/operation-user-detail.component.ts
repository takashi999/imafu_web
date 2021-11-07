import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { OperationUser } from 'src/app/services/operation/api/responses';

@Component({
  selector: 'app-operation-user-detail',
  templateUrl: './operation-user-detail.component.html',
  styleUrls: [ './operation-user-detail.component.scss' ],
})
export class OperationUserDetailComponent implements OnInit {

  user_id: number;
  s = new Subscription();
  detail$: Observable<OperationUser>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationStaffService: OperationStaffService,
  ) {
    const rawParam = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.user_id = parseInt(rawParam ?? '0', 10);
    this.detail$ = this.operationStaffService.getDetail(this.user_id);
    if (rawParam === null) {
      this.router.navigateByUrl('/operation/users');
      return;
    }
    this.s.add(
      this.activatedRoute.paramMap
        .subscribe(raw_id => {
          console.log(raw_id);

          if (rawParam === null) {
            this.router.navigateByUrl('/operation/users');
            return;
          }
          this.user_id = parseInt(rawParam ?? '0', 10);
          this.detail$ = this.operationStaffService.getDetail(this.user_id);
        }),
    );
  }

  ngOnInit(): void {
  }
}
