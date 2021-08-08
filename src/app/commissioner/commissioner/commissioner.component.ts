import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-commissioner',
  templateUrl: './commissioner.component.html',
  styleUrls: ['./commissioner.component.css']
})
export class CommissionerComponent implements OnInit {

  isPasswordVisible = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onFormSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe( isSuccess => {
        if(isSuccess) this.router.navigate(['commissioner','give-points']);
      });
    }
  }

}
