import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '../components/date-time-picker/date-time-picker.component';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonInput,
  IonItem,
  IonModal,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    IonModal,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    DateTimePickerComponent,
  ],
})
export class HomePage {
  bedtime = new Date();
  waketime = new Date();
  constructor(public sleepService: SleepService) {}

  ngOnInit() {
    console.log(this.allSleepData);
  }

  logEntry() {
    this.bedtime = new Date();
    this.waketime = new Date(0);
    this.setOpen(false);
  }

  saveEntry() {
    if (this.waketime < this.bedtime) return;
    var sleepDataObj = new OvernightSleepData(this.bedtime, this.waketime);
    this.sleepService.logOvernightData(sleepDataObj);
    this.setOpen(false);
  }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

  get overnightSleepData() {
    return [...SleepService.AllOvernightData].sort(
      (a, b) => b.loggedAt.getTime() - a.loggedAt.getTime(),
    );
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
