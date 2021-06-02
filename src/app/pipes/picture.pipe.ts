import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'picture'
})
export class PicturePipe implements PipeTransform {
  readonly API: string = environment.apiUrl + '/';

  transform(value: string, ...args: unknown[]): unknown {
    if (this.isValidHttpUrl(value)) {
      return value;
    }
    return this.API + value
  }

  isValidHttpUrl(string: string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }


}
