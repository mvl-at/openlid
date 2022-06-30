import {Component, OnInit} from '@angular/core';
import {Crew} from "../../common/model";
import {MemberService} from "../../services/member.service";
import {NavigationComponent, NavigationItem} from "../../components/navigation/navigation.component";
import {Router} from "@angular/router";

@Component({
  selector: 'lid-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  crew!: Crew;

  constructor(private memberService: MemberService, private navigation: NavigationComponent, private router: Router) {
  }

  ngOnInit(): void {
    this.memberService.getAllByRegisters().subscribe({
      next: data => {
        console.log('received registers', data);
        this.crew = data;
        let memberNavigation: NavigationItem[] = this.crew.musicians.map(register => ({
          link: this.router.url,
          fragment: register.name,
          label: register.name,
          children: []
        }));
        if (this.crew.sutlers.length > 0) {
          memberNavigation.push({
            children: [],
            fragment: "Marketenderinnen",
            label: "Marketenderinnen",
            link: this.router.url
          });
        }
        if (this.crew.honoraryMembers.length > 0) {
          memberNavigation.push({
            children: [],
            fragment: "Ehrenmitglieder",
            label: "Ehrenmitglieder",
            link: this.router.url
          });
        }
        this.navigation.addChildren('Mitglieder', memberNavigation);
      }
    })
  }

}
