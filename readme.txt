--Readme document for Katie Yue, kyue4@uci.edu, kyue4 --

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
~18 hrs


3. What online resources did you consult when completing this assignment? (list specific URLs)
- demo repo, ionic docs, linked
https://www.youtube.com/watch?v=5MC1T8pS7gY 
https://www.freecodecamp.org/news/creating-a-crud-to-do-app-using-ionic-4/
https://ionicframework.com/docs/api/fab
https://ionic.io/ionicons 



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
N/A


5. Is there anything special we need to know in order to run your code?
No.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
This app is designed for busy college students who want a clean interface to log sleep/sleepiness
as efficienty and intuitively as possible.


7. Did you design your app specifically for iOS or Android, or both?
Both. The app includes common best design practices such as having controls near the bottom of the display (add entry button). 
Navigation between sections is done via clicking through the ion-segment tabs rather than hardware specific back buttons or swiping.

8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
A person can log overnight sleep by clicking the add button on the "Hours Slept Log" tab which will open up a modal with a date/time picker 
where they can swipe through the options to pick the right start/end time. I picked this option so it's easy to input the times even if the
user forgot to initially log when they went to bed, and the add button is very intuitive.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
To log sleepiness, toggle over to the "Log Sleepiness" section and press the add button. A modal will pop up with a picker 
for the time (defaults to current time) and a picker for the different levels. This makes it easy since they don't have to type in
any values and can easily scroll through the options.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
Once any new data has been added, they will display as cards with the date/content (hours slept or sleepiness logged) respective to each
section. This way the data is shown the second the user opens the app for easy navigation, and toggling between views is very quick.


11. Which feature choose--using a native device resource, backing up logged data, or both?
Backing up.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A


13. If you backed up logged data, where does it back up to?
It's backed up to IndexedDB via Ionic Storage.

14. How does your app implement or follow principles of good mobile design?
The app provides a useful initial view, immediately opening up to the existing data logs with an intuitive add entry button, and also 
has error prevention by preventing users from saving any entries with waketimes before bedtimes, or waketimes/log times (for logging sleepiness) 
past the current time. Additionally there is an "uh-oh" button provided by an ion-toast component which provides an undo popup after
a user has deleted an entry to allow them to restore it.
