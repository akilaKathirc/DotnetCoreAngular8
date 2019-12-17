import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-glowingloader",
  templateUrl: "./glowingloader.component.html",
  styleUrls: ["./glowingloader.component.css"]
})
export class GlowingloaderComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "black";
  }
}
