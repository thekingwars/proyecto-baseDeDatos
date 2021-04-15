import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('nav_toggle', {static: true}) nav_toggle: ElementRef;
  @ViewChild('navbar', {static: true}) navbar: ElementRef;
  @ViewChild('body_pd', {static: true}) body_pd: ElementRef;

  constructor(private renderer: Renderer2, public authService: AuthService) { }

  ngOnInit(): void {
    this.collapseMenu();
  }

  showMenu(){
      if(!this.navbar.nativeElement.classList[1]){
        this.renderer.addClass(this.navbar.nativeElement, 'expander')
        this.renderer.addClass(this.body_pd.nativeElement, 'body-pd')
      }
      else{
        this.renderer.removeClass(this.navbar.nativeElement, 'expander')
        this.renderer.removeClass(this.body_pd.nativeElement, 'body-pd')
      }
  }

  hideMenu(){
    this.renderer.removeClass(this.navbar.nativeElement, 'expander')
    this.renderer.removeClass(this.body_pd.nativeElement, 'body-pd')
  }

  collapseMenu(){
    const linkCollapse = document.getElementsByClassName('collapse__link')
    var i
    for(i=0;i<linkCollapse.length;i++){
      linkCollapse[i].addEventListener('click', function(){
        const collapseMenu = this.nextElementSibling
        collapseMenu.classList.toggle('showCollapse')

        const rotate = collapseMenu.previousElementSibling
        rotate.classList.toggle('rotate')
      })
    }
  }

}
