import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'rupiahFormat',
    standalone: true,
})
export class RupiahFormatPipe implements PipeTransform {
    transform(value: number | string, ...args: unknown[]): string {
        if (value == null) {
            return '';
        }

        const numberValue = typeof value === 'string' ? parseFloat(value) : value;
        const formattedValue = Math.round(numberValue)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return 'Rp ' + formattedValue;
    }
}
