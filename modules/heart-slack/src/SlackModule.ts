import {
  AnalysisEvents,
  Module,
  ModuleInterface,
  ModuleListenerInterface,
  Report,
} from "@fabernovel/heart-core"
import { EventEmitter } from "events"

import { Client } from "./api/Client"

export class SlackModule extends Module implements ModuleListenerInterface {
  private slackClient: Client

  constructor(module: Omit<ModuleInterface, "id">) {
    super(module)

    this.slackClient = new Client()
  }

  /**
   * Register the events:
   * 1. take the events and their handlers from the mapping table
   * 2. register each event on the event emitter
   */
  public registerEvents(eventEmitter: EventEmitter): void {
    eventEmitter.on(AnalysisEvents.DONE, this.sendReport.bind(this))
  }

  private sendReport(report: Report): void {
    let message = `${report.analyzedUrl}: ${report.note}`

    if (report.resultUrl) {
      message += `. <${report.resultUrl}|view full report>`
    }

    if (report.isThresholdReached() === true) {
      message += "\n:white_check_mark: Your threshold is reached."
    } else if (report.isThresholdReached() === false) {
      message += "\n:warning: Your threshold is not reached."
    }

    void this.slackClient.postMessage({
      text: message,
      icon_url: report.service ? report.service.logo : undefined,
      username: report.service ? report.service.name : undefined,
    })
  }
}
