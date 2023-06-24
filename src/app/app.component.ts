import { Component, OnInit, ViewChild } from "@angular/core";
import { ktdTrackById, KtdGridLayout, KtdGridComponent } from "@katoid/angular-grid-layout";
import { debounceTime, filter, fromEvent, merge, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild(KtdGridComponent, { static: true }) grid: KtdGridComponent;
  resizeSubscription: Subscription = new Subscription();
  cols: number = 6;
  rowHeight: number = 100;
  autoResize = true;
  layout: KtdGridLayout = [
    { id: "0", x: 0, y: 0, w: 3, h: 3 },
    { id: "1", x: 3, y: 0, w: 3, h: 3 },
    { id: "2", x: 0, y: 3, w: 3, h: 3, minW: 2, minH: 3 },
    { id: "3", x: 3, y: 3, w: 3, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 5 },
  ];
  trackById = ktdTrackById;
  onLayoutUpdated(event: any) {
    console.log(event);
  }
  onResizeStarted(event: any) {
    console.log(event);
  }
  onResizeEnded(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.resizeSubscription = merge(
      fromEvent(window, "resize"),
      fromEvent(window, "orientationchange")
    )
      .pipe(
        debounceTime(50),
        filter(() => this.autoResize)
      )
      .subscribe(() => {
        this.grid.resize();
      });
  }
}
