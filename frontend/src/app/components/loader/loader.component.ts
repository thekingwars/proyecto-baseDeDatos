import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy {

  constructor(private router: Router, public loader: LoaderService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.loader.showSpinner();  
      }
      else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
        this.loader.hideSlow();
      }
    }, () => {
      this.loader.hideSlow();
    })
  }

  ngOnDestroy(): void {
    this.loader.hideSlow();
  }

}
