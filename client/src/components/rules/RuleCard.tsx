import { useState } from 'react';
import { Rule, RuleType } from '../../types/Rule';
import { useRuleStore } from '../../store/useRuleStore';
import { RuleConfigPanel } from './RuleConfigPanel';

interface RuleCardProps {
  rule: Rule;
  index: number;
}

/**
 * Individual rule card with actions and configuration
 */
export function RuleCard({ rule, index }: RuleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { removeRule, toggleRule } = useRuleStore();

  const getRuleTypeLabel = (type: RuleType): string => {
    switch (type) {
      case RuleType.CASING:
        return 'Casing';
      case RuleType.PREFIX:
        return 'Prefix';
      case RuleType.SUFFIX:
        return 'Suffix';
      case RuleType.NUMBERING:
        return 'Numbering';
      case RuleType.FIND_REPLACE:
        return 'Find & Replace';
      default:
        return 'Unknown';
    }
  };

  const getRuleTypeColor = (type: RuleType): string => {
    switch (type) {
      case RuleType.CASING:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case RuleType.PREFIX:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case RuleType.SUFFIX:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case RuleType.NUMBERING:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case RuleType.FIND_REPLACE:
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        rule.enabled
          ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">
            #{index + 1}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRuleTypeColor(rule.type)}`}
          >
            {getRuleTypeLabel(rule.type)}
          </span>
          {rule.name && (
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {rule.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRule(rule.id)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              rule.enabled
                ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            {rule.enabled ? 'Enabled' : 'Disabled'}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium transition-colors"
          >
            {isEditing ? 'Close' : 'Edit'}
          </button>
          <button
            onClick={() => removeRule(rule.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <RuleConfigPanel rule={rule} onClose={() => setIsEditing(false)} />
        </div>
      )}
    </div>
  );
}
