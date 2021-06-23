import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: any[], searchKeyword: string, fieldName: string): any[] {
    // return empty array if array is falsy
    if (!products) {
      return [];
    }

    // return the original array if search text is empty
    if (!searchKeyword) {
      return products;
    }

    // convert the searchText to lower case
    searchKeyword = searchKeyword.toLowerCase();

    // retrun the filtered array
    return products.filter((item) => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchKeyword);
      }
      return false;
    });
  }
}
