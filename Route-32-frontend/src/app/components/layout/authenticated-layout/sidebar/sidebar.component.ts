import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData, sideBarRetailer } from './sidenav-data';
import { INavbarData } from './helper';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export interface links {
  linkName: string;
  linkRoute: string;
}

export interface sideBarMenu {
  parent: string;
  child: Array<links>;
  parentRoute?: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      // transition(':leave', [
      //   style({opacity: 1}),
      //   animate('150ms',
      //   style({opacity: 0})
      //   )
      // ])
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  sideBarData = navbarData;
  adminSideBar = navbarData;
  retailerSideBar= sideBarRetailer;
  showHamburger = false;
  userData: any;
  hideSubMenu: Boolean = false;
  isImgDefault: Boolean = false;
  userImage: any;
  isAdmin: Boolean = false;
  isRetailer: Boolean = false;
  isSubRetailer: Boolean = false;

  isSidebarOpen: boolean = true;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = true;
  screenWidth = 0;
  multiple: boolean = false;

  constructor() {
    let userData: any = sessionStorage.getItem('userData');
    let data = JSON.parse(userData);
    if(data.orgType == "ADMIN"){
      this.isAdmin = true;
    }
    else if(data.orgType == "RETAILER"){
      this.isRetailer = true;
    }
    // console.log('this is sidebar data ', this.sideBarData);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    } else {
      this.collapsed = true;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  showSideBar() {
    this.showHamburger = true;
    document.getElementById('sideBar')?.classList.add('sidebar-active');
  }

  hideSideBar() {
    this.showHamburger = false;
    document.getElementById('sideBar')?.classList.remove('sidebar-active');
  }

  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }

  handleClick(item: INavbarData): void {
    console.log('clicking');

    if (!this.multiple) {
      for (let modelItem of this.sideBarData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
