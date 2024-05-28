import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom Angular pipe for truncating strings.
 * 
 * @class TruncatePipe
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

 /**
   * Transforms a string by truncating it to the specified length.
   * 
   * @param {string} value The input string to be truncated.
   * @param {number} length The maximum length of the truncated string.
   * @returns {string} The truncated string.
   */
  transform(value: string, length: number): string {
    if (!value || value.length <= length) {
      return value;
    }

    return `${value.substring(0, length)}...`;
  }
}