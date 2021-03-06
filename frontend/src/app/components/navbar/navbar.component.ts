import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('button_active', {static: true}) menu_burguer: ElementRef
  @ViewChild('contenedor', {static: true}) contenedor: ElementRef

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    console.log(this.contenedor.nativeElement.classList)
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
