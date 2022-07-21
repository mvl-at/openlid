import {Component, OnInit} from '@angular/core';
import {ArchiveService} from '../../services/archive.service';
import {Page, PageNumber, Score} from '../../common/archive';
import {PageEvent} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lid-archive', templateUrl: './archive.component.html', styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  attributeList = [{name: 'Titel', value: 'title'}, {name: 'Untertitel', value: 'subtitles'}, {
    name: 'Komponisten', value: 'composers'
  }, {name: 'Arrangeure', value: 'arrangers'}, {name: 'Verlag', value: 'publisher'}, {
    name: 'Aufbewahrung', value: 'location'
  }, {name: 'Seiten', value: 'pages'}];

  attributes = new FormControl(this.attributeList);

  // fields for the pagination
  pageSizes = [10, 20, 30, 50, 100];
  limit: number = 20;
  skip: number = 0;
  totalRows: number = 0;

  private viewScores: Score[] = [];

  constructor(private archiveService: ArchiveService) {
  }

  get scores() {
    return this.viewScores;
  }

  get selectedValues() {
    return this.attributes.value?.map(e => e.value);
  }

  private static pageNumberToString(pageNumber: PageNumber) {
    return `${pageNumber.prefix ?? ''}${pageNumber.number}${pageNumber.suffix ?? ''}`;
  }

  ngOnInit(): void {
    this.refreshArchive();
  }

  changePage(event: PageEvent) {
    this.skip = event.pageSize * event.pageIndex;
    this.limit = event.pageSize;
    this.refreshArchive();
  }

  pageToString(page: Page) {
    const begin = ArchiveComponent.pageNumberToString(page.begin);
    if (page.end) {
      return `${page.book} ${begin}-${ArchiveComponent.pageNumberToString(page.end)}`;
    } else {
      return `${page.book} ${begin}`;
    }
  }

  private refreshArchive() {
    this.archiveService.getAllScoresPaginated(this.limit, this.skip).subscribe({
      next: result => {
        this.viewScores = result.rows.map(r => r.doc);
        this.totalRows = result.total_rows;
      }, error: console.log
    });
  }
}
