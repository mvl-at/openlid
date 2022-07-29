import {Component, OnInit, ViewChild} from '@angular/core';
import {ArchiveService} from '../../services/archive.service';
import {Page, PageNumber, ScoreFilter} from '../../common/archive';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormControl} from '@angular/forms';
import {ScoresDataSource} from './scores-data-source';
import {FormModel, InferModeFromModel} from 'ngx-mf';

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
  scoreFilterForm = this.formBuilder.nonNullable.group<ScoreFilterForm['controls']>({
    searchTerm: this.formBuilder.control(null),
    regex: this.formBuilder.nonNullable.control(false),
    attributes: this.formBuilder.nonNullable.control([]),
    book: this.formBuilder.control('Rot'),
    location: this.formBuilder.control(null),
    sort: this.formBuilder.control(null),
    ascending: this.formBuilder.control(null)
  });

  // fields for the pagination
  pageSizes = [10, 20, 30, 50, 100];
  limit = 20;

  readonly scoresDataSource: ScoresDataSource;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;

  constructor(private archiveService: ArchiveService, private formBuilder: FormBuilder) {
    this.scoresDataSource = new ScoresDataSource(archiveService);
  }

  get scores() {
    return this.scoresDataSource;
  }

  get selectedValues() {
    return this.attributes.value?.map(e => e.value);
  }

  private static pageNumberToString(pageNumber: PageNumber) {
    return `${pageNumber.prefix ?? ''}${pageNumber.number}${pageNumber.suffix ?? ''}`;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.refreshScores();
  }

  changePage(_event: PageEvent) {
    this.refreshScores();
  }

  pageToString(page: Page) {
    const begin = ArchiveComponent.pageNumberToString(page.begin);
    if (page.end) {
      return `${page.book} ${begin}-${ArchiveComponent.pageNumberToString(page.end)}`;
    } else {
      return `${page.book} ${begin}`;
    }
  }

  private refreshScores() {
    this.scoresDataSource.loadScores(this.paginator.pageIndex, this.paginator.pageSize, this.scoreFilterForm.getRawValue());
  }
}

type ScoreFilterForm = FormModel<ScoreFilter, {}, InferModeFromModel>;
