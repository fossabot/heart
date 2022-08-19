import { Module, ModuleAnalysisInterface, ModuleInterface, Report } from '@fabernovel/heart-core'
import { Result } from 'lighthouse'
import { runAnalysis } from './api/Client'
import { LighthouseConfig } from './config/Config'
import {compute} from './scoring/compute'

export class LighthouseModule extends Module implements ModuleAnalysisInterface<LighthouseConfig> {
  constructor(module: Omit<ModuleInterface, 'id'>) {
    super(module)
  }

  public async startAnalysis(conf: LighthouseConfig): Promise<Report> {
    const results = await runAnalysis(conf)

    return this.handleResults(results)
  }

  private handleResults(result: Result): Report {
    const score = compute(result.categories, 1)

    return new Report({
      analyzedUrl: result.requestedUrl,
      date: new Date(result.fetchTime),
      service: this.service,
      note: score.toString()
    })
  }
}
