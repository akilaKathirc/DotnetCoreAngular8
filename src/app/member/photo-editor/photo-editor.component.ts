import { UserService } from "./../../_Services/user.service";
import { environment } from "./../../../environments/environment";
import { AuthService } from "./../../_Services/Auth.service";
import { Photo } from "./../../_models/Photo";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { AlertifyService } from "src/app/_Services/alertify.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberChangeEvent = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  baseUrl: string =
    "https://localhost:44342/api/Photos/" +
    this.authService.decodedToken.nameid +
    "/photos";
  currentMain: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyjs: AlertifyService
  ) {
    this.uploader = new FileUploader({
      url: this.baseUrl,
      authToken: `${"Bearer "}${localStorage.getItem("token")}`,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo: Photo = {
          id: res.id,
          description: res.description,
          url: res.url,
          dateadded: res.dateadded,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {}

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, +photo.id)
      .subscribe(
        () => {
          this.currentMain = this.photos.filter(p => p["isMain"] === true)[0];
          this.currentMain["isMain"] = false;
          photo["isMain"] = true;
          this.getMemberChangeEvent.emit(photo.url);
          this.authService.bSubject.next(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            "user",
            JSON.stringify(this.authService.currentUser)
          );
        },
        error => {
          this.alertifyjs.error(error);
        }
      );
  }

  deletePhoto(photo: Photo) {
    this.alertifyjs.confirm("Are you sure you want to delet?", () => {
  this.userService
    .DeletePhoto(this.authService.decodedToken.nameid, +photo.id)
    .subscribe(
      () => {
        this.photos.splice(this.photos.findIndex(p => p.id === photo.id),1);
        this.alertifyjs.success("Photo deleted successfully");
      },
      error => {
        this.alertifyjs.success("Photo delete was  not  successful");
      });
    });
  }
}
