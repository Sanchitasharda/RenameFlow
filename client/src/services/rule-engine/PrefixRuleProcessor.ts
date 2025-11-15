import { RuleProcessor } from './RuleProcessor';

export interface PrefixConfig {
  prefix: string;
}

/**
 * Processor for adding a prefix to filenames
 * Adds text before the filename (but after any path)
 */
export class PrefixRuleProcessor extends RuleProcessor<PrefixConfig> {
  apply(filename: string, config: PrefixConfig): string {
    if (!config.prefix || config.prefix.trim() === '') {
      return filename;
    }

    const basename = this.getBasename(filename);
    const extension = this.getExtension(filename);

    const sanitizedPrefix = this.sanitize(config.prefix);
    const newBasename = sanitizedPrefix + basename;

    return this.validateFilename(newBasename) + extension;
  }
}
