import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(input: string): string {
    if (input != null && input !== '') {
      try {
        const amountInCent: number = parseInt(input);
        const amountInEuro: number = amountInCent / 100.0;
        return amountInEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
      } catch (error) {
        return 'Ungültige Eingabe';
      }
    } else {
      return 'Eingabestring ist leer';
    }
  }
}
