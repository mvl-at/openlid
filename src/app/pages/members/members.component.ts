import {Component, OnInit} from "@angular/core";
import {Crew} from "../../common/member";
import {MemberService} from "../../services/member.service";
import {NavigationComponent, NavigationItem} from "../../components/navigation/navigation.component";
import {Router} from "@angular/router";
import {HttpErrorSnackBarService} from "../../mat-helpers/http-error-snack-bar.service";

@Component({
  selector: "lid-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnInit {

  crew!: Crew;

  constructor(private memberService: MemberService, private navigation: NavigationComponent, private router: Router, private snackBarErrorHandler: HttpErrorSnackBarService) {
  }

  ngOnInit(): void {
    this.memberService.getAllByRegisters().subscribe({
      next: data => {
        console.log("received registers", data);
        this.crew = data;
        const memberNavigation: NavigationItem[] = this.crew.musicians.map(register => ({
          link: [this.router.url],
          fragment: register.name,
          label: register.name,
          children: [],
          scroll: true
        }));
        if (this.crew.sutlers.length > 0) {
          memberNavigation.push({
            children: [],
            fragment: "Marketenderinnen",
            label: "Marketenderinnen",
            link: [this.router.url],
            scroll: true
          });
        }
        if (this.crew.honoraryMembers.length > 0) {
          memberNavigation.push({
            children: [],
            fragment: "Ehrenmitglieder",
            label: "Ehrenmitglieder",
            link: [this.router.url],
            scroll: true
          });
        }
        this.navigation.addChildren("Mitglieder", memberNavigation);
      },
      error: this.snackBarErrorHandler.showError
    })
  }

}
