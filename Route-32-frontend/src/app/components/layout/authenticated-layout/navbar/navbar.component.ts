import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isExpanded: boolean = false
  panelOpenState: boolean = false
  logoURL: string = 'src/assets/images/logo.png'
  userData: any = sessionStorage.getItem('userData');

  constructor(private route: Router){
    if(this.userData != null){
      this.userData = JSON.parse(this.userData);
    }
  }

  ngOnInit(): void {
    
  }

  onDropdownClicked(){
    this.isExpanded = !this.isExpanded
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/auth/login'])
  }
}
