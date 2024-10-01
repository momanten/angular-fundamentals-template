import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform{

    transform(durationInMinutes: number): string {
        const hours = Math.floor(durationInMinutes / 60) < 10 ? `0${Math.floor(durationInMinutes / 60)}`: `${Math.floor(durationInMinutes / 60)}` ;
        const minutes = durationInMinutes % 60 < 10 ? `0${durationInMinutes % 60}`: `${durationInMinutes % 60}` ;
        const unit = durationInMinutes >= 120 ? 'hours' : 'hour'
        return `${hours}:${minutes} ${unit}`;
    }

}



