import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OperationAuthService } from 'src/app/services/operation/api/operation-auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operation-login',
  templateUrl: './operation-login.component.html',
  styleUrls: [ './operation-login.component.scss' ],
})
export class OperationLoginComponent implements OnInit {
  hide = true;
  fg = new FormGroup({
    login_id: new FormControl(''),
    password: new FormControl(''),
  });
  s = new Subscription();
  failed = false;

  constructor(
    private operationAuthService: OperationAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  onSub() {
    this.s.add(
      this.operationAuthService.login(this.fg.value)
        .subscribe({
          next: () => {
            this.router.navigate([ '../' ], {
              relativeTo: this.activatedRoute,
            });
          },
          error: () => {
            this.failed = true;
          },
        }),
    );
  }
}
