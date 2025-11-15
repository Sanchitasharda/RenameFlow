import { useState } from 'react';
import { FindReplaceRule } from '../../types/Rule';
import { useRuleStore } from '../../store/useRuleStore';

interface FindReplaceRuleConfigProps {
  rule: FindReplaceRule;
}

/**
 * Configuration panel for find & replace rules
 */
export function FindReplaceRuleConfig({ rule }: FindReplaceRuleConfigProps) {
  const updateRule = useRuleStore((state) => state.updateRule);
  const [find, setFind] = useState(rule.config.find);
  const [replace, setReplace] = useState(rule.config.replace);
  const [caseSensitive, setCaseSensitive] = useState(rule.config.caseSensitive);
  const [replaceAll, setReplaceAll] = useState(rule.config.replaceAll);

  const handleSave = () => {
    updateRule(rule.id, {
      config: { find, replace, caseSensitive, replaceAll },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor={`find-${rule.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Find Text
        </label>
        <input
          id={`find-${rule.id}`}
          type="text"
          value={find}
          onChange={(e) => setFind(e.target.value)}
          onBlur={handleSave}
          placeholder="Text to find"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor={`replace-${rule.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Replace With
        </label>
        <input
          id={`replace-${rule.id}`}
          type="text"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          onBlur={handleSave}
          placeholder="Replacement text"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => {
              setCaseSensitive(e.target.checked);
              handleSave();
            }}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Case Sensitive
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Match exact case when finding text
            </div>
          </div>
        </label>

        <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <input
            type="checkbox"
            checked={replaceAll}
            onChange={(e) => {
              setReplaceAll(e.target.checked);
              handleSave();
            }}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Replace All Occurrences
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Replace all matches (or just the first one)
            </div>
          </div>
        </label>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Preview:
        </p>
        <p className="font-mono text-sm">
          <span className="text-red-600 dark:text-red-400 line-through">
            {find || 'text'}
          </span>
          <span className="text-gray-500"> → </span>
          <span className="text-green-600 dark:text-green-400">
            {replace || '(empty)'}
          </span>
        </p>
      </div>
    </div>
  );
}
