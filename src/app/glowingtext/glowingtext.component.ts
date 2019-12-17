import { Component, OnInit, AfterViewInit,ElementRef  } from '@angular/core';

@Component({
  selector: "app-glowingtext",
  templateUrl: "./glowingtext.component.html",
  styleUrls: ["./glowingtext.component.css"]
})
export class GlowingtextComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "black";
  }
}
