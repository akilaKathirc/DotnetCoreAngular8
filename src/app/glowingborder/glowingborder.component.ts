import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-glowingborder",
  templateUrl: "./glowingborder.component.html",
  styleUrls: ["./glowingborder.component.css"]
})
export class GlowingborderComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "black";
  }
}
