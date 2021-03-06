import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isSpinnerVisible;


  constructor() { 
    this.isSpinnerVisible = true;
  }

  showSpinner(){
    this.isSpinnerVisible = true;
  }

  hideSpinner(){
    this.isSpinnerVisible = false;
  }

  hideSlow(t:number = 1000){
    setTimeout(() => {
      this.hideSpinner()
    }, t)
  }
}
