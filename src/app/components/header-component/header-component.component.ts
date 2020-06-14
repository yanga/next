import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
  public currentPage: string;
  public pages = ['about', 'model-selector', 'logout'];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.currentPage = url[0].path;
      console.log('>>', url[0].path);
    });
  }
  public navigate (path: string) {
    if(path === this.pages[2]) {
      this.authService.logout();
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl(path)
    }
  }
}
