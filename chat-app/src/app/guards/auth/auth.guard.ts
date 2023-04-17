import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService, 
    private router: Router) {}

  async canLoad(): Promise<boolean> {
      try {
        const user = await this.authService.checkAuth();
        // const uid = this.authService.getId();
        console.log(user);
        if(user) {
          return true;
        } else {
          this.navigate('/login');
          return false;
        }
      } catch(e) {
        console.log(e);
        this.navigate('/login');
        return false;
      }
  }

  navigate(url: any) {
    this.router.navigateByUrl(url, {replaceUrl: true});
  }
}
