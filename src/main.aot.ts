/*
import { platformBrowser } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";

import { AppModuleNgFactory } from "../compiled/src/app/app.module.ngfactory";

enableProdMode();

if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("Active service worker found, no need to register");
  } else {
    navigator.serviceWorker.register("/sw.js", {scope: "./"})
      .then((reg: ServiceWorkerRegistration) => {
        console.log("Service worker has been registered for scope:" + reg.scope);
      });
  }

  let reg: ServiceWorkerRegistration;
  navigator.serviceWorker.ready
    .then((swReg: ServiceWorkerRegistration) => {
      reg = swReg;
      return swReg.pushManager.getSubscription();
    })
    .then((sub: PushSubscription) => {
      if (sub === null) {
        const vapidPublicKey: string = "BK2wyRz5e33h8yMzoXvxCSF9v6Us1xTQiqSasQiM7U4cDv0nNyDtDH-4qbrDcDqDqyEVVZhcBnGauDQykknfc9w";
        const convertedVapidPublicKey: Uint8Array = urlBase64ToUint8Array(vapidPublicKey);
        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        // We have a subscription
      }
    })
    .catch((err: Error) => {
      console.log(err);
    });
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding: string = "=".repeat((4 - base64String.length % 4) % 4);
  const base64: string = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData: string = window.atob(base64);
  const outputArray: Uint8Array = new Uint8Array(rawData.length);

  for (let i: number = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
*/
