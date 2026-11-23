import { Component, ViewChild, signal } from '@angular/core';
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
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonIcon,
  IonFab,
  IonFabButton,
  IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addCircle, trashOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
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
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    FormsModule,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    IonIcon,
    IonFab,
    IonFabButton,
    IonToast,
  ],
})
export class HomePage {
  bedtime = new Date();
  waketime = new Date();
  sleepinessTime = new Date();
  sleepinessLevel: number = 1;
  scaleValues = StanfordSleepinessData.ScaleValues;

  isModalOpen = false;
  view = 'hours-slept';
  isSleepinessOpen = false;
  entriesSaved = signal<boolean>(false);

  isToastOpen = false;
  lastDeletedHoursSlept: OvernightSleepData | null = null;
  lastDeletedSleepiness: StanfordSleepinessData | null = null;

  public toastButtons = [
    {
      text: 'Undo delete',
      role: 'cancel',
      handler: () => {
        if (this.lastDeletedHoursSlept) this.undoDeleteHours();
        else this.undoDeleteSleepiness();
      },
    },
  ];

  constructor(public sleepService: SleepService) {
    addIcons({ add, addCircle, trashOutline });
  }

  async ngOnInit() {
    await this.sleepService.loadData();
    this.entriesSaved.set(true);
  }

  logHoursEntry() {
    this.bedtime = new Date();
    this.waketime = new Date();
    this.setLogHoursOpen(false);
  }

  logSleepinessEntry() {
    this.sleepinessLevel = 1;
    this.setSleepinessOpen(false);
  }

  saveHoursEntry() {
    if (this.waketime < this.bedtime) return;
    var sleepDataObj = new OvernightSleepData(this.bedtime, this.waketime);
    this.sleepService.logOvernightData(sleepDataObj);
    this.setLogHoursOpen(false);
  }

  saveSleepinessEntry() {
    if (this.sleepinessTime > new Date()) return;
    var sleepinessObj = new StanfordSleepinessData(
      this.sleepinessLevel,
      this.sleepinessTime,
    );
    this.sleepService.logSleepinessData(sleepinessObj);
    // this.sleepService.logOvernightData(sleepDataObj);
    this.setSleepinessOpen(false);
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

  get sleepinessData() {
    return [...SleepService.AllSleepinessData].sort(
      (a, b) => b.loggedAt.getTime() - a.loggedAt.getTime(),
    );
  }

  setLogHoursOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setSleepinessOpen(isOpen: boolean) {
    this.isSleepinessOpen = isOpen;
  }

  async deleteSleepiness(data: StanfordSleepinessData) {
    this.lastDeletedSleepiness = data;
    await this.sleepService.deleteSleepinessData(data);
    this.isToastOpen = true;
  }

  async deleteHoursSlept(data: OvernightSleepData) {
    this.lastDeletedHoursSlept = data;
    await this.sleepService.deleteHoursSleptData(data);
    this.isToastOpen = true;
  }

  async undoDeleteHours() {
    if (this.lastDeletedHoursSlept) {
      await this.sleepService.logOvernightData(this.lastDeletedHoursSlept);
      this.lastDeletedHoursSlept = null;
    }
  }

  async undoDeleteSleepiness() {
    if (this.lastDeletedSleepiness) {
      await this.sleepService.logSleepinessData(this.lastDeletedSleepiness);
      this.lastDeletedSleepiness = null;
    }
  }

  public setToastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
