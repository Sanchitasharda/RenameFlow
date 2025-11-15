import { useState } from 'react';
import { NumberingRule, NumberingPlacement } from '../../types/Rule';
import { useRuleStore } from '../../store/useRuleStore';

interface NumberingRuleConfigProps {
  rule: NumberingRule;
}

/**
 * Configuration panel for numbering rules
 */
export function NumberingRuleConfig({ rule }: NumberingRuleConfigProps) {
  const updateRule = useRuleStore((state) => state.updateRule);
  const [startValue, setStartValue] = useState(rule.config.start);
  const [padding, setPadding] = useState(rule.config.padding);
  const [placement, setPlacement] = useState(rule.config.placement);

  const handleSave = () => {
    updateRule(rule.id, {
      config: { start: startValue, padding, placement },
    });
  };

  const getPreviewNumber = () => {
    return startValue.toString().padStart(padding, '0');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`start-${rule.id}`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Start Value
          </label>
          <input
            id={`start-${rule.id}`}
            type="number"
            min="0"
            value={startValue}
            onChange={(e) => setStartValue(parseInt(e.target.value) || 0)}
            onBlur={handleSave}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor={`padding-${rule.id}`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Padding (Digits)
          </label>
          <input
            id={`padding-${rule.id}`}
            type="number"
            min="1"
            max="10"
            value={padding}
            onChange={(e) => setPadding(parseInt(e.target.value) || 1)}
            onBlur={handleSave}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Placement
        </label>
        <div className="space-y-2">
          <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name={`placement-${rule.id}`}
              value={NumberingPlacement.PREFIX}
              checked={placement === NumberingPlacement.PREFIX}
              onChange={() => {
                setPlacement(NumberingPlacement.PREFIX);
                handleSave();
              }}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Prefix (Before filename)
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {getPreviewNumber()}_filename.jpg
              </div>
            </div>
          </label>

          <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name={`placement-${rule.id}`}
              value={NumberingPlacement.SUFFIX}
              checked={placement === NumberingPlacement.SUFFIX}
              onChange={() => {
                setPlacement(NumberingPlacement.SUFFIX);
                handleSave();
              }}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Suffix (After filename)
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                filename_{getPreviewNumber()}.jpg
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Preview (first file):
        </p>
        <p className="font-mono text-gray-900 dark:text-white">
          {placement === NumberingPlacement.PREFIX
            ? `${getPreviewNumber()}_filename.jpg`
            : `filename_${getPreviewNumber()}.jpg`}
        </p>
      </div>
    </div>
  );
}
