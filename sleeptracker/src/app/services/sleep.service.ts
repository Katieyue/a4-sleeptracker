import { Injectable, signal } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
  private static LoadDefaultData: boolean = true;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor(private storage: StorageService) {
    // if (SleepService.LoadDefaultData) {
    //   //   this.addDefaultData();
    //   SleepService.LoadDefaultData = false;
    //   this.loadData();
    // }
  }

  private addDefaultData() {
    var goToBed = new Date();
    goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
    goToBed.setHours(1, 3, 0); //1:03am
    var wakeUp = new Date();
    wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
    this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
    var sleepinessDate = new Date();
    sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
    sleepinessDate.setHours(14, 38, 0); //2:38pm
    this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
    goToBed = new Date();
    goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
    goToBed.setHours(23, 11, 0); //11:11pm
    wakeUp = new Date();
    wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
    this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
  }

  async loadData() {
    if (!SleepService.LoadDefaultData) return;
    SleepService.LoadDefaultData = false;

    let overnight = await this.storage.get('overnight');
    let sleepiness = await this.storage.get('sleepiness');

    if (!overnight && !sleepiness) {
      this.addDefaultData();
      await this.save();
      return;
    }

    let overnightData: OvernightSleepData[] = (overnight ?? []).map(
      (oData: any) => {
        let entry = new OvernightSleepData(
          new Date(oData.sleepStart),
          new Date(oData.sleepEnd),
        );
        entry.loggedAt = new Date(oData.loggedAt);
        return entry;
      },
    );

    let sleepinessData: StanfordSleepinessData[] = (sleepiness ?? []).map(
      (sData: any) => {
        return new StanfordSleepinessData(
          sData.value,
          new Date(sData.loggedAt),
        );
      },
    );

    SleepService.AllOvernightData = overnightData;
    SleepService.AllSleepinessData = sleepinessData;
    SleepService.AllSleepData = [...overnightData, ...sleepinessData];

    console.log(
      'arrays after load:', // ← add this as the very last line
      SleepService.AllOvernightData.length,
      SleepService.AllSleepinessData.length,
    );
  }

  async save() {
    await this.storage.set(
      'overnight',
      SleepService.AllOvernightData.map((entry) => ({
        sleepStart: entry.sleepStart,
        sleepEnd: entry.sleepEnd,
        loggedAt: entry.loggedAt,
      })),
    );
    await this.storage.set(
      'sleepiness',
      SleepService.AllSleepinessData.map((entry) => ({
        value: entry.loggedValue,
        loggedAt: entry.loggedAt,
      })),
    );
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
    this.save();
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
    this.save();
  }

  public async deleteSleepinessData(data: StanfordSleepinessData) {
    const i = SleepService.AllSleepinessData.indexOf(data);
    SleepService.AllSleepinessData.splice(i, 1);
    const j = SleepService.AllSleepData.indexOf(data);
    SleepService.AllSleepData.splice(j, 1);
    await this.save();
  }

  public async deleteHoursSleptData(data: OvernightSleepData) {
    const i = SleepService.AllOvernightData.indexOf(data);
    SleepService.AllOvernightData.splice(i, 1);
    const j = SleepService.AllSleepData.indexOf(data);
    SleepService.AllSleepData.splice(j, 1);
    await this.save();
  }
}
