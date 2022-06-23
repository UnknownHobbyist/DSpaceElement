import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hightlight'
})
export class HightlightPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, "<mark>" + match[0] + "</mark>");
  }

}
