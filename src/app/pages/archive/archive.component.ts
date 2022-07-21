import {Component, OnInit} from '@angular/core';
import {ArchiveService} from '../../services/archive.service';
import {Pagination, Score} from '../../common/archive';

@Component({
  selector: 'lid-archive', templateUrl: './archive.component.html', styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  displayedColumns: string[] = ['title', 'subtitles', 'composers', 'arrangers', 'publisher', 'location'];
  limit: number = 30;
  offset: number = 120;
  private viewScores: Score[] = [];
  private result: Pagination<Score> | null = null;

  constructor(private archiveService: ArchiveService) {
  }

  get columns() {
    return this.displayedColumns;
  }

  get scores() {
    return this.viewScores;
  }

  get totalRows(): number {
    return this.result?.total_rows ?? 0;
  }

  ngOnInit(): void {
    this.archiveService.getAllScoresPaginated(this.limit, this.offset).subscribe({
      next: result => {
        this.viewScores = result.rows.map(r => r.doc);
      }, error: console.log
    });
  }

}
