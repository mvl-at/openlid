import {Component, OnInit} from '@angular/core';
import {Register} from "../../common/model";
import {MemberService} from "../../services/member.service";
import {NavigationComponent, NavigationItem} from "../../components/navigation/navigation.component";
import {Router} from "@angular/router";

@Component({
  selector: 'lid-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  registers!: Register[];

  constructor(private memberService: MemberService, private navigation: NavigationComponent, private router: Router) {
  }

  ngOnInit(): void {
    this.memberService.getAllByRegisters().subscribe({
      next: data => {
        console.log('received registers', data);
        this.registers = data;
        this.navigation.addChildren('Mitglieder', this.registers.map(register => ({
          link: this.router.url,
          fragment: register.name,
          label: register.name,
          children: []
        })))
      }
    })
  }

}
