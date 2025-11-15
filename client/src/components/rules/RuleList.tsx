import { useRuleStore } from '../../store/useRuleStore';
import { RuleCard } from './RuleCard';
import { AddRuleDropdown } from './AddRuleDropdown';

/**
 * Container component for displaying and managing all rules
 */
export function RuleList() {
  const rules = useRuleStore((state) => state.rules);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Renaming Rules
        </h2>
        <AddRuleDropdown />
      </div>

      {rules.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400">
            No rules added yet. Click "Add Rule" above to start renaming!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <RuleCard key={rule.id} rule={rule} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
