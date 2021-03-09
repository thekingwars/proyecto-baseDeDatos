import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('button_active', {static: true}) menu_burguer: ElementRef
  @ViewChild('contenedor', {static: true}) contenedor: ElementRef
  @ViewChild('navbar', {static: true}) navbar: ElementRef;

  scroll: any;
  elemento;

  constructor(private renderer2: Renderer2) { 
  }

  ngAfterViewInit(){
    this.scroll = fromEvent(document, 'scroll')
    this.navbarScroll()
  }

  navbarScroll(){
    this.scroll.subscribe(res => {
      const scrollY = res.target.documentElement.scrollTop
      if(scrollY >= 700){
          this.renderer2.setStyle(this.navbar.nativeElement, 'opacity', '.8')
      }
      else{
        this.renderer2.setStyle(this.navbar.nativeElement, 'opacity', '1')
      }
    })
  }

  onClick(){
    if(this.contenedor.nativeElement.classList[0] === 'grid__row--two'){
      this.renderer2.removeClass(this.contenedor.nativeElement, 'grid__row--two');
      this.renderer2.addClass(this.contenedor.nativeElement, 'grid__row--two-active');
      this.renderer2.addClass(this.contenedor.nativeElement, 'animate__animated')
      this.renderer2.addClass(this.contenedor.nativeElement, 'animate__slideInLeft')
    }
    else if(this.contenedor.nativeElement.classList[0] === 'grid__row--two-active'){
      this.renderer2.addClass(this.contenedor.nativeElement, 'grid__row--two');
      this.renderer2.removeClass(this.contenedor.nativeElement, 'grid__row--two-active');
      this.renderer2.removeClass(this.contenedor.nativeElement, 'animate__animated')
      this.renderer2.removeClass(this.contenedor.nativeElement, 'animate__slideInLeft')
    }
  }

  removeClass(){
    if(this.contenedor.nativeElement.classList[0] === 'grid__row--two-active'){
      this.renderer2.addClass(this.contenedor.nativeElement, 'grid__row--two');
      this.renderer2.removeClass(this.contenedor.nativeElement, 'grid__row--two-active');
      this.renderer2.removeClass(this.contenedor.nativeElement, 'animate__animated')
      this.renderer2.removeClass(this.contenedor.nativeElement, 'animate__slideInLeft')
    }
  }

}
