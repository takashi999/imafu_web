import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorJPIntl extends MatPaginatorIntl {
  firstPageLabel = '最初のページ';
  lastPageLabel = '最後のページ';
  itemsPerPageLabel = '1ページごとの件数';
  previousPageLabel = '<';
  nextPageLabel = '>';
}
