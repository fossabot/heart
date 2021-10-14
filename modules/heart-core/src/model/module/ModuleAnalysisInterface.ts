import ReportInterface from '../report/ReportInterface';

import ModuleInterface from './ModuleInterface';

/**
 * Define an Analysis module.
 */
export default interface ModuleAnalysisInterface<A> extends ModuleInterface {
  startAnalysis: (conf: object) => Promise<ReportInterface<A>>;
}

/**
 * Constructor interface signature
 * @see {@link https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes}
 */
export type ModuleAnalysis<A> = new () => ModuleAnalysisInterface<A>;

/**
 * Checks if a module is an Analysis one.
 * @see {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards | User-Defined Type Guards}
 */
export function isModuleAnalysis<A>(module: ModuleInterface): module is ModuleAnalysisInterface<A> {
  const m = module as ModuleAnalysisInterface<A>;

  return m !== undefined && m.startAnalysis !== undefined && 'function' === typeof m.startAnalysis;
}
