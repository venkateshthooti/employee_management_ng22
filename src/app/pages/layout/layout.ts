import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { User } from '../../core/model/Interfaces/user';
import { GlobalConstant } from '../../core/globalConstant/Global.Constant';
import { MatListModule } from '@angular/material/list';


@Component({
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {
  router=inject(Router)

  loggerUserData!:User;

  constructor(){
    const localData=localStorage.getItem(GlobalConstant.LOGIN_RESPONSE_LOCALSTORAGE_KEY)

    if(localData !=null){
       this.loggerUserData=JSON.parse(localData) //Type casting or Covering JSOn sting to object
    }
    

    console.log(localData+"  JSON STRING")
    console.log(this.loggerUserData.employeeName+"  After converting JSON string to object")
  }
  
  onLogout(){
    // this.router.navigateByUrl("login")
    localStorage.removeItem(GlobalConstant.LOGIN_RESPONSE_LOCALSTORAGE_KEY)
    this.router.navigate(['login'])
  }

  getUserInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase();
}
 
}
