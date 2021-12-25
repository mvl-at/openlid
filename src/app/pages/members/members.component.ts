import { Component, OnInit } from '@angular/core';
import {Register} from "../../common/model";
import {MemberService} from "../../services/member.service";

@Component({
  selector: 'lid-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  registers!: Register[];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getAllByRegisters().subscribe({
      next: data => {
        console.log('received registers', data);
        this.registers = data;
      }
    })
  }

}
