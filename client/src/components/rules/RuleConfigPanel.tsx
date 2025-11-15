import { Rule, RuleType } from '../../types/Rule';
import { CasingRuleConfig } from './CasingRuleConfig';
import { PrefixRuleConfig } from './PrefixRuleConfig';
import { SuffixRuleConfig } from './SuffixRuleConfig';
import { NumberingRuleConfig } from './NumberingRuleConfig';
import { FindReplaceRuleConfig } from './FindReplaceRuleConfig';

interface RuleConfigPanelProps {
  rule: Rule;
  onClose: () => void;
}

/**
 * Wrapper component that renders the appropriate configuration panel
 * based on the rule type
 */
export function RuleConfigPanel({ rule, onClose }: RuleConfigPanelProps) {
  const renderConfig = () => {
    switch (rule.type) {
      case RuleType.CASING:
        return <CasingRuleConfig rule={rule} />;
      case RuleType.PREFIX:
        return <PrefixRuleConfig rule={rule} />;
      case RuleType.SUFFIX:
        return <SuffixRuleConfig rule={rule} />;
      case RuleType.NUMBERING:
        return <NumberingRuleConfig rule={rule} />;
      case RuleType.FIND_REPLACE:
        return <FindReplaceRuleConfig rule={rule} />;
      default:
        return <div>Unknown rule type</div>;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Configure Rule
        </h3>
      </div>
      {renderConfig()}
    </div>
  );
}
