import { Component, OnInit,Input} from '@angular/core';
import {AuthService} from '../auth.service'
import {Router} from '@angular/router'
import {ProfileComponent} from '../profile/profile.component'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data:any;
  name:String='';
  address:String='';
  email:String='';
  userDetail:String;
  phone:String='';
   show:Array<any>=[];
  profile={
    "name":this.name,
    "address":this.address,
    "email":this.email,
    "phone":this.phone
  }
  constructor(
    private auth:AuthService,
    private router:Router,
    ) { }

  ngOnInit() {
  //  this.data=this.pp.userDetail
  this.auth.sharedMessage.subscribe(message => this.userDetail = message)
  //  console.log(this.data)
   console.log(this.userDetail)
   this.auth.getData(this.userDetail).subscribe((data)=>{
     console.log(data)
     this.show.push(data);
     console.log(this.show)

    // this.name=this.data['name'];
    // this.address=this.data['address'];
    // this.email=this.data['email'];
    // this.phone=this.data['phone'];

   })

  }

signOut(){
  console.log('2')
  localStorage.removeItem('token')
  this.router.navigateByUrl('/login')
}
}
