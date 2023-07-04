import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";

@Injectable()
export class LidMatPaginatorIntl extends MatPaginatorIntl{
  override itemsPerPageLabel = "Elemente pro Seite"
  override firstPageLabel = "Anfang"
  override lastPageLabel = "Ende"
  override nextPageLabel = "weiter"
  override previousPageLabel = "zurück"
  override getRangeLabel = (page: number, pageSize: number, length: number) => `${page} – ${pageSize} von ${length}`
}
