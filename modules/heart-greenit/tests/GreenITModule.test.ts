import { Report } from "@fabernovel/heart-core"
import { createJsonReports } from "greenit-cli/cli-core/analysis"
import path from "path"
import { mocked } from "jest-mock"

import { GreenITModule } from "../src/GreenITModule"

import successResults from "./data/successReport.json"
import { conf } from "./data/Conf"

jest.mock("greenit-cli/cli-core/analysis")
const mockedCreateJsonReports = mocked(createJsonReports, true)

describe("Run GreenIT analysis", () => {
  it("should be able to launch a successful analysis without thresholds", async () => {
    const now = new Date()

    mockedCreateJsonReports.mockResolvedValue([
      {
        path: path.join(__dirname, "./data/successReport.json"),
        name: "1.json",
      },
    ])

    const moduleConfig = {
      id: "1234",
      name: "Green IT",
      service: {
        name: "Green IT",
        logo: "some-logo",
      },
    }

    const module = new GreenITModule(moduleConfig)
    const analysisReport = await module.startAnalysis(conf)
    analysisReport.date = now

    const mockReport = new Report({
      analyzedUrl: successResults.url,
      date: now,
      note: successResults.ecoIndex.toString(),
      service: moduleConfig.service,
      threshold: undefined,
    })
    expect(analysisReport).toStrictEqual(mockReport)
  })

  it("should be able to handle a failed analysis", async () => {
    mockedCreateJsonReports.mockResolvedValue([
      {
        path: path.join(__dirname, "./data/errorReport.json"),
        name: "1.json",
      },
    ])

    const moduleConfig = {
      id: "1234",
      name: "Green IT",
      service: {
        name: "Green IT",
        logo: "some-logo",
      },
    }

    const errorMessage = "Error during GreenIT analysis"
    const module = new GreenITModule(moduleConfig)

    try {
      await module.startAnalysis(conf)
    } catch (error) {
      expect(error).toBe(errorMessage)
    }
  })

  it("should be able to launch a successful analysis with thresholds", async () => {
    const now = new Date()

    mockedCreateJsonReports.mockResolvedValue([
      {
        path: path.join(__dirname, "./data/successReport.json"),
        name: "1.json",
      },
    ])

    const moduleConfig = {
      id: "1234",
      name: "Green IT",
      service: {
        name: "Green IT",
        logo: "some-logo",
      },
    }

    const THRESHOLD = 30

    const module = new GreenITModule(moduleConfig)
    const analysisReport = await module.startAnalysis(conf, THRESHOLD)
    analysisReport.date = now

    const mockReport = new Report({
      analyzedUrl: successResults.url,
      date: now,
      note: successResults.ecoIndex.toString(),
      service: moduleConfig.service,
      threshold: THRESHOLD,
    })

    expect(analysisReport).toStrictEqual(mockReport)
  })

  it("Should return false when results do not match thresholds objectives", async () => {
    const now = new Date()

    mockedCreateJsonReports.mockResolvedValue([
      {
        path: path.join(__dirname, "./data/successReport.json"),
        name: "1.json",
      },
    ])

    const moduleConfig = {
      id: "1234",
      name: "Green IT",
      service: {
        name: "Green IT",
        logo: "some-logo",
      },
    }

    const THRESHOLD = 30

    const module = new GreenITModule(moduleConfig)
    const analysisReport = await module.startAnalysis(conf, THRESHOLD)
    analysisReport.date = now

    const mockReport = new Report({
      analyzedUrl: successResults.url,
      date: now,
      note: successResults.ecoIndex.toString(),
      service: moduleConfig.service,
      threshold: THRESHOLD,
    })

    expect(analysisReport).toStrictEqual(mockReport)
    expect(analysisReport.isThresholdReached()).toStrictEqual(false)
  })
})
