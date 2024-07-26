import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginDB= new Map<string,Login>();
  constructor(private router:Router) { 
    this.loginDB.set("2468admin",{userid:"2468admin",password:"44668822"});
    this.loginDB.set("1",{userid:"1",password:"2468"});
    this.loginDB.set("2",{userid:"2",password:"8642"});
    
  }
  loginTheUser(user:Login):boolean{
    if(this.loginDB.has(user.userid)){
      if(user.userid==='2468admin'){
        if(user.password===this.loginDB.get(user.userid)?.password)
        {localStorage.setItem(user.userid,JSON.stringify(user));
          console.log(user.userid+" "+user);
          this.router.navigate(["/admin/dashboard"]);
          return true;
        }
      }
      else {
        if(user.password===this.loginDB.get(user.userid)?.password){
          localStorage.setItem(user.userid,JSON.stringify(user));
          console.log(user.password+" "+`/service-advisor/${user.userid}/dashboard/${user.userid}`);
          this.router.navigate([`/service-advisor/${user.userid}/dashboard/${user.userid}`]);
          return true;
        }
      }
    }
    return false;
  }
  isAdminToken():boolean{
    let x=localStorage.getItem("2468admin");
    if(x?JSON.parse(x).userid==="2468admin":false)
      return true;
    else return false;
  }
  isServiceToken(id:string):boolean{
    if(localStorage.getItem(id))return true;
    else return false;
  }
  createSA(user:Login){
    this.loginDB.set(user.userid,user);
    console.log("created" +this.loginDB);
  }
  deleteSA(id:string){
    this.loginDB.delete(id);
    console.log("deleted "+this.loginDB);
  }
}
