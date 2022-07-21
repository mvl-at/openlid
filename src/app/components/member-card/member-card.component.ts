import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../common/member';
import {environment} from '../../../environments/environment';
import {controllers} from '../../services/controllers';

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
    return `${environment.barrelUrl}${controllers.members.photo(this.member.username)}`;
  }

  ngOnInit(): void {
  }

}
