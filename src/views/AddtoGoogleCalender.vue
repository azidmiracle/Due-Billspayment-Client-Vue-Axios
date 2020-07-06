<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title slot="start">Add to Google Calendar</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding="true">
      <form @submit="handleAuthClick">
        <ion-item>
          <ion-label position="stacked">Title of the Event</ion-label>
          <ion-input type="text" :value="duename" readonly></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Scheduled day of the month</ion-label>
          <ion-input type="text" :value="scheduled_day" readonly></ion-input>
        </ion-item>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">No. of Years</ion-label>
            <ion-select
              :value="years"
              @ionBlur="years = $event.target.value"
              ok-text="Okay"
              cancel-text="Dismiss"
            >
              <ion-select-option value="1">1 year</ion-select-option>
              <ion-select-option value="2">2 years</ion-select-option>
              <ion-select-option value="3">3 years</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <ion-button
          :disabled="duename == null"
          type="submit"
          fill="solid"
          expand="block"
          color="danger"
          >Add to Google Calendar</ion-button
        >
      </form>
    </ion-content>
  </div>
</template>

<script>
// Client ID and API key from the Developer Console
// Array of API discovery doc URLs for APIs used by the quickstart
const API_KEY = process.env.VUE_APP_API_KEY;
const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

import { gapiPromise } from "@/modules/api.js";
export default {
  name: "AddtoGoogleCalender",
  props: {
    scheduled_day: Number,
    duename: String,
    benefeciary_name: String,
  },
  data() {
    return {
      noDaysMonth: null,
      years: null,
      recurrenceDate: null,
      api: undefined,
      authorized: false,
      event: null,
    };
  },
  created() {
    this.convertDate();
    gapiPromise.then(() => {
      const gapi = window.gapi;
      if (!gapi) {
        console.error("Failed to load gapi!");
        return;
      } else {
        this.api = gapi;
        this.handleClientLoad();
      }
    });
  },
  methods: {
    loading() {
      return this.$ionic.loadingController
        .create({
          cssClass: "my-custom-class",
          message: "Add event to your Google Calendar...",
          duration: this.timeout,
        })
        .then((loading) => {
          setTimeout(function() {
            loading.dismiss();
          }, this.timeout);
          return loading.present();
        });
    },
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad() {
      this.api.load("client:auth2", this.initClient);
    },
    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
      let vm = this;

      vm.api.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign-in state changes.
          vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
        });
    },

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick(e) {
      e.preventDefault(); //to prevent the page from reloading
      this.convertDate();
      let isConfirmed = confirm(
        "Do you want to add this due reminder to your Google calendar?"
      );
      if (isConfirmed) {
        Promise.resolve(this.api.auth2.getAuthInstance().signIn()).then(() => {
          this.authorized = true;
          var request = this.api.client.calendar.events.insert({
            calendarId: "primary",
            resource: this.event,
          });
          this.loading();
          request.execute(function(event) {
            alert(event.summary + " HAS BEEN CREATED SUCCESSFULLY.");
          });
        });
      }
      isConfirmed = false;
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
      Promise.resolve(this.api.auth2.getAuthInstance().signOut()).then(() => {
        this.authorized = false;
      });
    },
    //when the close button is clicked, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss();
    },
    convertDate() {
      let dateToday = new Date();
      let year = dateToday.getFullYear();
      let month = dateToday.getMonth();
      //check days of the month
      this.noDaysMonth = new Date(2020, month + 1, 0).getDate();
      //get the full year
      //get the month
      if (this.scheduled_day >= this.noDaysMonth) {
        //if the set day schedule is greater than the number of days
        this.scheduled_day = this.noDaysMonth;
      }

      let scheduleDate = new Date(year, month, this.scheduled_day);
      this.recurrenceDate = scheduleDate.toISOString().slice(0, 10);

      //let endDate = new Date(
      //scheduleDate.setMonth(month + (this.years*12))//if the value of the year is 1 it will be multiplied by 12 months
      // ).toISOString().slice(0, 10);

      //update the event

      this.event = {
        summary: `PAYMENT FOR ${this.duename.toUpperCase()} REMINDER`,
        description: `BENEFECIARY NAME ${this.benefeciary_name}`,
        start: {
          dateTime: `${this.recurrenceDate}T18:00:00.000-07:00`,
          timeZone: "Singapore",
        },
        end: {
          dateTime: `${this.recurrenceDate}T18:25:00.000-07:00`,
          timeZone: "Singapore",
        },
        recurrence: [`RRULE:FREQ=MONTHLY;INTERVAL=1;COUNT=${this.years*12}`],

        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      };
      //console.log(this.event);
    },
  },
};
</script>
