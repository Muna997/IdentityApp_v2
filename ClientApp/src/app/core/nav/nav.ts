import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  constructor(
    public accountService: AccountService,
    private router: Router,
  ) {}

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.setUser(null);
        this.router.navigateByUrl('/account/login');
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
