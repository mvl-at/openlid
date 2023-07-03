import {Component, OnInit} from "@angular/core";
import {Crew} from "../../common/member";
import {MemberService} from "../../services/member.service";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {Router} from "@angular/router";
import {HttpErrorSnackBarService} from "../../mat-helpers/http-error-snack-bar.service";
import {Location} from "@angular/common";

@Component({
  selector: "lid-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnInit {

  crew!: Crew;

  constructor(private memberService: MemberService, private location: Location, private navigation: NavigationComponent, private router: Router, private snackBarErrorHandler: HttpErrorSnackBarService) {
  }

  ngOnInit(): void {
    this.memberService.getAllByRegisters().subscribe({
      next: data => {
        console.log("received registers", data);
        this.crew = data;
      },
      error: this.snackBarErrorHandler.showError
    })
  }

}
