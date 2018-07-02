import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {ProfileService} from "./profile.service";
import {User} from "./user.model";
import {MainService} from "../main.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  disabled = true;
  myForm: FormGroup;
  users: any;

  constructor(private router: Router,
              private profileService: ProfileService,
              private mainService: MainService,
              private spinnerService: Ng4LoadingSpinnerService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.users = this.profileService.widgets;
    // console.log(this.users);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl(this.users.firstname, Validators.required),
      lastname: new FormControl(this.users.lastname, Validators.required),
      email: new FormControl(this.users.email, [Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      phone: new FormControl(this.users.phone),
      organization: new FormControl(this.users.organization),
      title: new FormControl(this.users.title),
      description: new FormControl(this.users.description),
      image_url: new FormControl(this.users.profile_picture)
    });
    this.myForm.disable();
  }

  updateDetails() {
    this.myForm.enable();
    this.disabled = false;
  }

  cancelUpdate() {
    this.myForm = new FormGroup({
      firstname: new FormControl(this.users.firstname, Validators.required),
      lastname: new FormControl(this.users.lastname, Validators.required),
      email: new FormControl(this.users.email, [Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      phone: new FormControl(this.users.phone),
      organization: new FormControl(this.users.organization),
      title: new FormControl(this.users.title),
      description: new FormControl(this.users.description),
      image_url: new FormControl(this.users.image_url)
    });

    this.myForm.disable();
    this.disabled = true;
  }

  onSubmit() {
    // console.log(this.myForm.value);
    const user = new User(this.profileService.routeParams.id, this.myForm.value.firstname, this.myForm.value.lastname, this.myForm.value.email, this.myForm.value.phone, this.myForm.value.organization, this.myForm.value.title, this.myForm.value.description, this.myForm.value.image_url);
    this.spinnerService.show();
    setTimeout(() => { }, 4000);
    this.mainService.updateUser(user)
      .subscribe(
        data => {
          this.spinnerService.hide();
          this.toastr.success('Contact details updated', 'Updated Contact!');
          // console.log(data);
          this.myForm.disable();
          this.disabled = true;
          this.router.navigateByUrl(this.router.url);
        },
        error => {
          console.error(error);
          this.spinnerService.hide();
          this.toastr.error('Error from server', 'Error!');
        }
      );
  }

  deleteContact() {
    const user = new User(this.profileService.routeParams.id);
    this.spinnerService.show();
    this.mainService.deleteUser(user)
      .subscribe(
        data => {
          this.spinnerService.hide();
          this.toastr.success('Contact deleted', 'Deleted!');
          // console.log(data);
          this.router.navigateByUrl('');
        },
        error => {
          console.error(error);
          this.spinnerService.hide();
          this.toastr.error('Error from server', 'Error!');
        }
      );
  }

}
