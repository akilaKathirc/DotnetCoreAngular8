import { Component, OnInit } from "@angular/core";

import { UserService } from "../../_Services/user.service";
import { AlertifyService } from "../../_Services/alertify.service";
import { User } from "../../_models/User";
import { ActivatedRoute } from "@angular/router";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";


@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"]
})
export class MemberDetailComponent implements OnInit {
  user: User;
  userId: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private activateroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateroute.data.subscribe(data => {
      this.user = data["user"];
    });
    this.GalleryInitialization();
  }

  GalleryInitialization(){
     this.galleryOptions = [
       {
         width: "600px",
         height: "400px",
         thumbnailsColumns: 4,
         imageAnimation: NgxGalleryAnimation.Slide
       },
       // max-width 800
       {
         breakpoint: 800,
         width: "500px",
         height: "500px",
         imagePercent: 80,
         thumbnailsPercent: 20,
         thumbnailsMargin: 20,
         thumbnailMargin: 20,
         thumbnailsColumns: 4,
         imageAnimation:NgxGalleryAnimation.Slide
       },
       // max-width 400
       {
         breakpoint: 400,
         preview: false
       }
     ];

     this.galleryImages = this.loadGalleryImagesUrl();
  }

loadGalleryImagesUrl(){
  const imageGallery =[] ;
  for (const photo of this.user.photos) {
    imageGallery.push({
      small: photo.url,
      medium: photo.url,
      big: photo.url
    });
  }
  return imageGallery;;
}

  // loadUser() {
  //   this.activateroute.params.subscribe(param => {
  //     this.userId = +param["id"];
  //     this.userService.getUser(this.userId).subscribe(user => {
  //       this.user = user;
  //     });
  //   });
  // }
}
