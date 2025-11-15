import { CasingRule, CasingType } from '../../types/Rule';
import { useRuleStore } from '../../store/useRuleStore';

interface CasingRuleConfigProps {
  rule: CasingRule;
}

/**
 * Configuration panel for casing rules
 */
export function CasingRuleConfig({ rule }: CasingRuleConfigProps) {
  const updateRule = useRuleStore((state) => state.updateRule);

  const caseTypes = [
    {
      value: CasingType.SNAKE_CASE,
      label: 'snake_case',
      example: 'my_file_name.jpg',
    },
    {
      value: CasingType.CAMEL_CASE,
      label: 'camelCase',
      example: 'myFileName.jpg',
    },
    {
      value: CasingType.PASCAL_CASE,
      label: 'PascalCase',
      example: 'MyFileName.jpg',
    },
    {
      value: CasingType.UPPER_CASE,
      label: 'UPPERCASE',
      example: 'MY_FILE_NAME.JPG',
    },
    {
      value: CasingType.LOWER_CASE,
      label: 'lowercase',
      example: 'myfilename.jpg',
    },
  ];

  const handleCaseTypeChange = (caseType: CasingType) => {
    updateRule(rule.id, { ...rule, caseType });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Case Type
      </label>
      <div className="space-y-2">
        {caseTypes.map((caseType) => (
          <label
            key={caseType.value}
            className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <input
              type="radio"
              name={`case-type-${rule.id}`}
              value={caseType.value}
              checked={rule.caseType === caseType.value}
              onChange={() => handleCaseTypeChange(caseType.value)}
              className="mr-3"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {caseType.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Example: {caseType.example}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
