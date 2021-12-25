import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../common/model";

@Component({
  selector: 'lid-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input('member')
  member!: Member;

  constructor() {
  }

  get photo(): string {
    return '';
  }

  ngOnInit(): void {
  }

}
