import {Component, OnInit} from '@angular/core';
import {ArchiveService} from '../../services/archive.service';
import {Score} from '../../common/archive';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'lid-archive', templateUrl: './archive.component.html', styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  displayedColumns: string[] = ['title', 'subtitles', 'composers', 'arrangers', 'publisher', 'location'];

  // fields for the pagination
  pageSizes = [10, 20, 30, 50, 100];
  limit: number = 20;
  skip: number = 0;
  totalRows: number = 0;

  private viewScores: Score[] = [];

  constructor(private archiveService: ArchiveService) {
  }

  get columns() {
    return this.displayedColumns;
  }

  get scores() {
    return this.viewScores;
  }

  ngOnInit(): void {
    this.refreshArchive();
  }

  changePage(event: PageEvent) {
    this.skip = event.pageSize * event.pageIndex;
    this.limit = event.pageSize;
    this.refreshArchive();
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
