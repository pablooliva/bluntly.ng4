import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { FirebaseListObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../shared/auth.service";

@Component({
  selector: "blnt-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.scss"]
})
export class ShareComponent implements OnInit, OnDestroy {
  @Input() shareTitle: string;
  @Input() questionSets: FirebaseListObservable<any[]>;

  public userId: string;
  public shareLinkPre: string;
  public haveQuestions: boolean;

  private _questionsSubscription: Subscription;

  public constructor(
    private _authService: AuthService,
    private _elemRef: ElementRef,
    private _renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.haveQuestions = false;
    this.userId = this._authService.currentUser["uid"];
    this.shareLinkPre = process.env.APP_URL + "q/";
    this._questionsSubscription = this.questionSets.subscribe(records => {
      if (records.length) {
        this.haveQuestions = true;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this._questionsSubscription) {
      this._questionsSubscription.unsubscribe();
    }
  }

  public copyLink(event: MouseEvent): void {
    const elem: HTMLElement = this._elemRef.nativeElement.querySelector("#" + event.srcElement.id);

    this._renderer.removeClass(elem, "btn-primary");
    this._renderer.addClass(elem, "btn-success");
    elem.innerText = "Link Copied";

    setTimeout(() => {
      this._renderer.removeClass(elem, "btn-success");
      this._renderer.addClass(elem, "btn-primary");
      elem.innerText = "Copy Link";
    }, 3000);
  }
}